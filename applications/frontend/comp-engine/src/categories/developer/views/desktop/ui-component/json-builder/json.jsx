import NodeRow from './node-row';
import helpers from 'ui-helpers';
import Versions from './versions';
import Input from 'aio-global-raw-ui/atoms/form/input';
import {useState, useMemo, useEffect, useCallback, useRef} from 'react';

const Comp = (props) => {
    const data = props.data;
    const qEngine = useRef(null);
    const builder = props.builder;
    const onChange = props.onChange;
    const templates = props.templates;
    const [query, setQuery] = useState('');
    const initial = useMemo(() => data, [data]);
    const [searching, setSearching] = useState(false);
    const [history, setHistory] = useState([initial]);
    const [historyIndex, setHistoryIndex] = useState(0);
    const [searchResults, setSearchResults] = useState(null);
    const [activeTree, setActiveTree] = useState(history[historyIndex] || []);

    const [preview, setPreview] = useState(true);
    const [showVersions, setShowVersions] = useState(false);
    const [versions, setVersions] = useState(() => (builder.version?.load ? builder.version.load() : []));    

    if (!qEngine.current) {
        qEngine.current = helpers.plugins.filter.init(initial, {
            debounceDelay:5
        });
    }

    useEffect(() => {
        return () => {
            if(qEngine.current?.destroy) {
                qEngine.current.destroy();
            }
        };
    }, []);

    useEffect(() => {
        if (qEngine.current?.setData) {
            qEngine.current.setData(activeTree);
        }
    }, [activeTree]);

    useEffect(() => {
        const trimmedQuery = (query || '').trim();

        if (!trimmedQuery) {
            setSearchResults(null);
            setSearching(false);
            return;
        }

        setSearching(true);

        if (qEngine.current?.filterTree) {
            let resp = qEngine.current.filterTree({
                $and:[{
                    '__.key':{
                        highlight:true,
                        operator:'startswith',
                        value:trimmedQuery
                    }
                }]
            }, {
                highlight:false,
                searchChildren:true,         // If false, children are ignored and only top-level roots are evaluated
                childKey:'__.children',  
                treeConfig: {
                    maxDepth:Infinity,  // Recursion limit cutoff to prevent call-stack overflows
                    keepAncestors:true, // If child matches, preserve and render the parent path to root
                    keepDescendantsOnParentMatch:false, // If parent matches, retain all its children unconditionally
                }
            });
            setSearchResults(resp);
            setSearching(false);
        }
    }, [query, activeTree]);

    const onTreeChange = useCallback((newTree, skipHistory) => {
        setActiveTree(newTree);
       
        if (!skipHistory) {
            setHistory((prevHistory) => { return [...prevHistory.slice(0, historyIndex + 1), newTree]});
            setHistoryIndex((prevIndex) => prevIndex + 1);
        }
    }, [historyIndex]);

    const undo = useCallback(() => {
        if (historyIndex > 0) {
            const prevIndex = historyIndex - 1;
            setHistoryIndex(prevIndex);
            setActiveTree(history[prevIndex]);
        }
    }, [historyIndex, history]);

    const redo = useCallback(() => {
        if (historyIndex < history.length - 1) {
            const nextIndex = historyIndex + 1;
            setHistoryIndex(nextIndex);
            setActiveTree(history[nextIndex]);
        }
    }, [historyIndex, history]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
                if (e.shiftKey){
                    redo();
                }else{
                    undo();
                }
            } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
                redo();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [undo, redo]);

    useEffect(() => {
        if (builder.version?.save) {
            builder.version.save(versions);
        }
    }, [versions, builder]);

    const isValid = useMemo(() => builder.isTreeValid(activeTree), [builder, activeTree]);

    useEffect(() => {
        if (window.helpers?.react?.hooks?.event?.emit) {
            window.helpers.react.hooks.event.emit(builder.id, {
                valid:isValid,
                json:activeTree,
            });
        }

        if (onChange) {
            onChange(activeTree, isValid);
        }
    }, [activeTree]);

    useEffect(() => {
        const previewEvent = builder.utils?.eventNames?.preview || 'preview:toggle';
        if (window.helpers?.react?.hooks?.event?.emit) {
            window.helpers.react.hooks.event.emit(previewEvent, { preview });
        }
    }, [preview, builder]);

    const onUpdate = (id, updater, skipHistory) => {
        setQuery('');
        onTreeChange(builder.updateNode(activeTree, id, updater), skipHistory);
    };

    const onDelete = (id) => {
        onTreeChange(builder.deleteNode(activeTree, id));
    };

    const onAddChild = (parentId, child) => {
        onTreeChange(builder.addChildNode(activeTree, parentId, child));
    };

    const addRootField = () => {
        onTreeChange([...activeTree, builder.createNode('', 'string', {}, false, true)]);
    };

    const tree = (searchResults !== null ? searchResults : activeTree);

    const addRootNode = (ttip) => {
        return <span className="ico-18 cp ico-g-plus" data-tip-html={ttip || "Add Root Field"} onClick={addRootField} />
    }

    const previewIcon = () => {
        return <span className={`ico-18 cp ico-g-eye${preview ? '-off' : ''}`} data-tip-html={preview ? 'Hide Preview' : 'Show Preview'} onClick={() => setPreview((prev) => !prev)} />
    }

    const searchInput = () => {
        return (
            <Input
                clearable={true}
                value={query}
                placeholder="Search schema..."
                callback={{
                    onChangeStart: (val) => setQuery(val || ''),
                }}
            />
        )
    }

    const undoUi = () => {
        return  <span className={`cp mr-r20 txt-xs ${historyIndex === 0 ? 'txt-c00104 not-allowed' : 'txt-c00107'}`} onClick={undo}>Undo</span>
    }

    const redoUi = () => {
        return  <span className={`cp txt-xs ${historyIndex >= history.length - 1 ? 'txt-c00104 not-allowed' : 'txt-c00107'}`} onClick={redo}>Redo</span>
    }

    const version = () => {
        return <span className="cp txt-xs txt-c00107 link" onClick={() => setShowVersions(true)}>Versions ({versions.length})</span>
    }

    const errorMessage = () => {
        if(isValid){
            return <></>
        }
        return <span className="txt-xxs mr-t8 txt-c00306 db">⚠️ Resolve empty or duplicate keys before compiling</span>
    }

    const title = helpers.json.get(props, 'content.json.editor.title', '')

    const headerTemplate = () => {
        return (
            <div className='full bxs'>
                <div className="full bxs pd-b16">
                    <div className="full flx-full flx-sb">
                        {title && <h3 className="bxs txt-sm fm-md flx-full">{title}</h3>}
                        <ul className="flx flx-vc gap-8">
                            <li className="fl">
                                {addRootNode()}
                            </li>
                            <li className="fl">
                                {previewIcon()}
                            </li>
                        </ul>
                    </div>
                    {errorMessage()}
                </div>
                <div className="full flx-vc grid-wrapper pd-b12">
                    <div className="grid-w6">
                        {searchInput()}
                    </div>
                    <div className="grid-w6 flx-sb flx-vc bxs pd-rl16">
                        <div className="flx gap-12">
                            {undoUi()}
                            {redoUi()}
                        </div>
                        {version()}
                    </div>
                </div>
            </div>
        )
    }

    const header = () => {
        if (props.templates && props.templates.header && helpers.data.type.is(props.templates.header, 'function')) {
            return props.templates.header({
                template:{
                    layout:headerTemplate,
                    partials:{
                        errorMsg:{
                            show:isValid,
                            ui:errorMessage
                        },
                        addRootNode:{
                            ui:addRootNode,
                            method:addRootField,
                        },
                        preview:{
                            ui:previewIcon,
                            method:setPreview,
                        },
                        input:{
                            value:query,
                            ui:searchInput,
                            methods:{
                                setQuery:setQuery
                            }
                        },
                        undo:{
                            ui:undoUi,
                            method:undo,
                            disabled:(historyIndex === 0)
                        },
                        redo:{
                            ui:redoUi,
                            method:redo,
                            disabled:(historyIndex >= history.length - 1)
                        },
                        version:{
                            label:{
                                ui:version,
                                counts:versions.length,
                                method:{
                                    toggle:setShowVersions
                                }
                            }
                        }
                    }
                }
            }, {})
        }else{
            return headerTemplate()
        }
    }

    const treeWrapper = () => {
        return helpers.element.jsx.attrs(helpers.json.get(props, 'configs.json.editor.wrapper', {}), 'full bxs');
    }

    return (
        <div {...treeWrapper()}>
            {header()}
            <div className="full bxs">
                {tree.length === 0 ? (<div className="full bxs">{searching ? 'Searching...' : 'No matching fields found.'}</div>):(
                    tree.map((node, index) => (
                        <NodeRow
                            depth={0}
                            node={node}
                            index={index}
                            query={query}
                            key={node.__.id}
                            builder={builder}
                            parentType="object"
                            templates={templates}
                            entireTree={activeTree}
                            onUpdate={onUpdate}
                            onDelete={onDelete}
                            onAddChild={onAddChild}
                            validation={{
                                isValidTree:isValid
                            }}
                            isKeyDuplicate={builder.isDuplicate}
                        />
                    ))
                )}
            </div>

            {/* Versions Modal */}
            {showVersions && (
                <Versions
                    show={showVersions}
                    tree={activeTree}
                    builder={builder}
                    onChange={(arg) => setVersions(arg)}
                    onClose={() => setShowVersions(false)}
                    onRestore={(restoredTree) => {
                        onTreeChange(restoredTree);
                        setShowVersions(false);
                    }}
                />
            )}
        </div>
    );
};

export default Comp;