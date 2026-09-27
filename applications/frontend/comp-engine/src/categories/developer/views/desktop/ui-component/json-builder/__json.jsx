import Input from './input';
import NodeRow from './node-row';
import Versions from './versions';
import {useState, useMemo, useEffect, useCallback, useRef} from 'react';

const Comp = (props) => {
    const builder = props.builder;
    const qEngine = useRef(null);
    const {onChange, getIconByType} = props;
    
    const [searching, setSearching] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const rawData = useMemo(() => [
        builder.createNode('userId', 'number', {required: true, dvalue: 1001, isExpanded:true, metas:[{id:'sss', key:'sandeep', value:'kundu'}]}),
        {
            ...builder.createNode('userConfig', 'object', { required: true, isExpanded:true, }),
            children:[
                builder.createNode('theme_mode', 'string', { required: false, dvalue: 'dark'}),
            ],
        },
    ], []);

    const [tree, setResults] = useState(rawData);

    if(!qEngine.current){
        qEngine.current = helpers.plugins.filter.init(rawData, { 
            debounceDelay: 200 
        });
    }

    useEffect(() => {
        return () => {
            if(qEngine.current){
                qEngine.current.destroy();
            }
        };
    }, []);

    useEffect(() => {
        if (!searchQuery.trim()) {
          setResults(rawData);
          setSearching(false);
          return;
        }
    
        let isCurrent = true;
        setSearching(true);
        qEngine.current.findDebounced({
            $and:[
                {
                    key:{
                        highlight:true,
                        value:searchQuery,
                        operator:'startswith'
                    }
                }
            ]
        }, {highlight:true}).then((response) => {
            if (!isCurrent || response.cancelled){
                return;
            }else{
                setResults(response.data);
                setSearching(false);
            }
                
            }).catch(err => {
                if(isCurrent) {
                    setSearching(false);
                }
        });
    
        return () => {
            isCurrent = false;
        };
    }, [searchQuery, rawData]);

    useEffect(() => {
        console.log(tree);
    }, [tree])

    const [history, setHistory] = useState([tree]);
    const [historyIndex, setHistoryIndex] = useState(0);
    const [showVersions, setShowVersions] = useState(false);
    const [versions, setVersions] = useState(() => builder.version.load());
    //const tree = history[historyIndex] || [];

    const [preview, setPreview] = useState(true)

    const commitTreeChange = useCallback((newTree) => {
        setHistory((prevHistory) => {return [...prevHistory.slice(0, historyIndex + 1), newTree]});
        setHistoryIndex((prevIndex) => prevIndex + 1);
    }, [historyIndex]);

    const handleUndo = useCallback(() => {
        if (historyIndex > 0){
            setHistoryIndex((prev) => prev - 1);
        }
    }, [historyIndex]);

    const handleRedo = useCallback(() => {
        if (historyIndex < history.length - 1) {
            setHistoryIndex((prev) => prev + 1);
        }
    }, [historyIndex, history.length]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
                if (e.shiftKey){
                    handleRedo();
                }else{
                    handleUndo();
                }
            }else if((e.ctrlKey || e.metaKey) && e.key === 'y') {
                handleRedo();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleUndo, handleRedo]);

    useEffect(() => {
        builder.version.save(versions);
    }, [versions]);

    const handleSearchChange = (e) => {
        const q = e.target.value;
        setSearchQuery(q);
        if(q.trim()) {
            //commitTreeChange(builder.expandMatching(tree, q));
        }
    };

    const isValid = useMemo(() => builder.isTreeValid(tree), [tree]);

    useEffect(() => {
        helpers.react.hooks.event.emit(builder.id, {
            json:tree,
            valid:isValid
        });

        if(onChange){
            //onChange(res, tree, isValid);
        }
    }, [tree, isValid, onChange]);

    useEffect(() => {
        helpers.react.hooks.event.emit(builder.utils.eventNames.preview, {
            preview:preview
        });
    }, [preview])

    const handleUpdate = (id, updater) => {
        commitTreeChange(builder.updateNode(tree, id, updater));
    };

    const handleDelete = (id) => {
        commitTreeChange(builder.deleteNode(tree, id));
    };

    const handleAddChild = (parentId, child) => {
        commitTreeChange(builder.addChildNode(tree, parentId, child));
    };

    const handleAddRootField = () => {
        commitTreeChange([...tree, builder.createNode('', 'string')]);
    };

    const versionUi = () => {
        if(showVersions){
            return (
                <Versions
                    tree={tree}
                    show={showVersions}
                    builder={props.builder}
                    onChange={(arg) => {
                        setVersions(arg);
                    }}
                    onClose={() => {
                        setShowVersions(false)
                    }}
                    onRestore={(arg) => {
                        commitTreeChange(arg);
                        setShowVersions(false)
                    }}
                />
            )
        }
    }

    const previewIcon = () => {
        return <span className={`mr-l10 ico-18 cp ico-g-eye${preview?'-off':''}`} data-tip-html={preview?`Off preview`:'Preview'} onClick={() => {setPreview(!preview)}} />
    }

    const addIcon = () => {
        return <span className={`mr-l10 ico-18 cp ico-g-plus`} data-tip-html="Add Root Field" onClick={handleAddRootField} />   
    }

    return (
        <div className='full bxs bg-c00101 pd-16 bdr-1 bdr-c00104 bdr-8'>
            <div className='full bxs pd-b16'>
                <div className='full flx-full'>
                    <h3 className='bxs txt-sm fm-md flx-full full'>Schema Field Editor</h3>
                    <ul className='flx'>
                        <li className='fl'>{addIcon()}</li>
                        <li className='fl'>{previewIcon()}</li>
                    </ul>
                </div>
                {!isValid && (<span className='txt-xxs mr-t8 txt-c00306'>⚠️ Resolve empty or duplicate keys before compiling</span>)}
            </div>
            <div className='full flx-vc grid-wrapper'>
                <div className='grid-w6'>
                    <Input
                        clearable={true}
                        value={searchQuery}
                        placeholder="Search schema..."
                        callback={{
                            onChangeStart:(val) => {
                                handleSearchChange({
                                    target:{
                                        value:val
                                    }
                                })
                            }
                        }}
                    />
                </div>
                <div className='grid-w6 flx-sb bxs pd-rl16'>
                    <span className={`cp txt-xs txt-${(historyIndex === 0)?'c00104':"c00107"}`} onClick={handleUndo}>Undo</span>
                    <span className={`cp txt-xs txt-${(historyIndex >= history.length - 1)?'c00104':"c00107"}`} onClick={handleRedo}>Redo</span>
                    <span className={`cp txt-xs txt-c00107 link`} onClick={() => setShowVersions(true)}> Versions ({versions.length})</span>
                    {addIcon()}
                    {previewIcon()}
                </div>
            </div>

            <div className='full bxs'>
                {(tree || []).map((node, index) => (
                    <NodeRow
                        depth={0}
                        node={node}
                        key={node.id}
                        index={index}
                        entireTree={tree}
                        parentType="object"
                        builder={props.builder}
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
                        searchQuery={searchQuery}
                        templates={props.templates}
                        onAddChild={handleAddChild}
                        getIconByType={getIconByType}
                        isSiblingKeyDuplicateFn={builder.isDuplicate}
                    />
                ))}
            </div>
            {versionUi()}
    </div>
  );
};

export default Comp;