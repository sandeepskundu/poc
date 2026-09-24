import NodeRow from './node-row';
import Versions from './versions';
import Input from 'aio-global-raw-ui/atoms/form/input';
import {useState, useMemo, useEffect, useCallback} from 'react';

const Comp = (props) => {
    const builder = props.builder;
    const {initialNodes, onChange, renderCustomMetaAttribute, getIconByType} = props;

    const defaultTree = useMemo(() => [
        builder.createNode('userId', 'number', { required: true, dvalue: 1001, value: 1001, isExpanded:true, customMeta:[{id:'sss', key:'sandeep', value:'kundu'}]}),
        {
            ...builder.createNode('userConfig', 'object', { required: true }),
            children: [
                builder.createNode('theme_mode', 'string', { required: false, dvalue: 'dark', value: 'dark' }),
            ],
        },
    ], []);

    const [history, setHistory] = useState([defaultTree]);
    const [historyIndex, setHistoryIndex] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [showVersions, setShowVersions] = useState(false);
    const [draggedParentType, setDraggedParentType] = useState(null);
    const [versions, setVersions] = useState(() => builder.version.load());
    const tree = history[historyIndex] || [];

    const commitTreeChange = useCallback((newTree) => {
        setHistory((prevHistory) => {
            return [...prevHistory.slice(0, historyIndex + 1), newTree];
        });
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
            commitTreeChange(builder.expandMatching(tree, q));
        }
    };

    const isValid = useMemo(() => builder.isTreeValid(tree), [tree]);

    useEffect(() => {
        helpers.react.hooks.event.emit('PREVIEW_JSON_DATA', {
            json:tree,
            valid:isValid
        });

        if(onChange){
            //onChange(res, tree, isValid);
        }
    }, [tree, isValid, onChange]);

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

    const handleReorder = (draggedId, targetParentId, targetIndex) => {
        const {cleanedTree, draggedNode} = builder.extractNode(tree, draggedId);
        if(!draggedNode){
            return;
        };
        commitTreeChange(builder.insertAtActiveLevel(cleanedTree, targetParentId, draggedNode, targetIndex));
    };

    const handleReparent = (draggedId, targetParentId) => {
        commitTreeChange(builder.reparentNode(tree, draggedId, targetParentId));
    };

    const versionUi = () => {
        if(showVersions){
            return (
                <>
                    <Versions
                        tree={tree}
                        show={showVersions}
                        builder={props.builder}
                        onChange={(arg) => {
                            setVersions(arg);
                        }}
                        onClose={() => {
                            debugger;
                            setShowVersions(false)
                        }}
                        onRestore={(arg) => {
                            commitTreeChange(arg);
                            setShowVersions(false)
                        }}
                    />
                </>
            )
        }
    }

    return (
        <div className='full bxs bg-c00101 pd-16 bdr-1 bdr-c00104 bdr-8'>
            <div className='full bxs pd-b16'>
                <h3 className='full bxs txt-sm fm-md'>Schema Field Editor</h3>
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
                    <span className={`cp txt-xs txt-c00107 link`} onClick={handleAddRootField}>+ Add Root Field</span>
                </div>
            </div>

            <div className='full bxs'>
                {(tree || []).map((node, index) => (
                    <NodeRow
                        key={node.id}
                        node={node}
                        depth={0}
                        parentType="object"
                        index={index}
                        parentId="root"
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
                        onAddChild={handleAddChild}
                        entireTree={tree}
                        isSiblingKeyDuplicateFn={builder.isDuplicate}
                        onReorder={handleReorder}
                        onReparent={handleReparent}
                        draggedParentType={draggedParentType}
                        setDraggedParentType={setDraggedParentType}
                        searchQuery={searchQuery}
                        renderCustomMetaAttribute={renderCustomMetaAttribute}
                        getIconByType={getIconByType}
                        builder={props.builder}
                    />
                ))}
            </div>
            {versionUi()}
    </div>
  );
};

export default Comp;