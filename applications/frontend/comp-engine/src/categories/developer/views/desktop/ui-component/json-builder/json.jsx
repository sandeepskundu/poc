import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import Input from './input';
import NodeRow from './node-row';
import Versions from './versions';

const Comp = (props) => {
    const { builder, onChange, getIconByType, templates } = props;
    const qEngine = useRef(null);

    // --- Search States ---
    const [isSearching, setIsSearching] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState(null);

    // --- Initial Schema Data Seed ---
    const initialTree = useMemo(() => [
        builder.createNode('userIduser', 'number', {
            required:true,
            dvalue:1001,
            isExpanded:true,
            metas: [{id:'sss', key:'sandeep', value:'kundu'}],
        }),
        {
            ...builder.createNode('userConfig', 'object', { required: true, isExpanded: true }),
            children: [
                builder.createNode('theme_mode_for_user_userId_', 'string', { required: false, dvalue: 'dark' }),
            ],
        },
    ], [builder]);

    // --- History & Active State Management ---
    const [history, setHistory] = useState([initialTree]);
    const [historyIndex, setHistoryIndex] = useState(0);
    const activeTree = history[historyIndex] || [];

    // --- Versioning & UI Toggles ---
    const [showVersions, setShowVersions] = useState(false);
    const [versions, setVersions] = useState(() => (builder.version?.load ? builder.version.load() : []));
    const [preview, setPreview] = useState(true);

    // --- Initialize Search Filter Engine ---
    if (!qEngine.current && window.helpers?.plugins?.filter) {
        qEngine.current = window.helpers.plugins.filter.init(initialTree, {
            debounceDelay:5
        });
    }

    // Cleanup Search Filter Engine
    useEffect(() => {
        return () => {
            if (qEngine.current?.destroy) {
                qEngine.current.destroy();
            }
        };
    }, []);

    // Update query engine's target data index when activeTree changes
    useEffect(() => {
        if (qEngine.current?.setData) {
            qEngine.current.setData(activeTree);
        }
    }, [activeTree]);

    // --- Debounced Search Query Handling ---
    useEffect(() => {
        const val = searchQuery.trim();
        setIsSearching(true);

        if (qEngine.current?.filterTree) {
            let resp = qEngine.current.filterTree({
                $and:[{
                    key:{
                        highlight:true,
                        value:val || '',
                        operator:'startswith'
                    }
                }]
            }, {
                highlight:true,
                searchChildren:true,         // If false, children are ignored and only top-level roots are evaluated
                childKey:'children',  
                treeConfig: {
                    maxDepth:Infinity,  // Recursion limit cutoff to prevent call-stack overflows
                    keepAncestors:true, // If child matches, preserve and render the parent path to root
                    keepDescendantsOnParentMatch:false, // If parent matches, retain all its children unconditionally
                }
            });
            setSearchResults(resp);
            setIsSearching(false);
        }
    }, [searchQuery, activeTree]);

    // --- Tree Commit / History Mutations ---
    const commitTreeChange = useCallback((newTree) => {
        setHistory((prevHistory) => [...prevHistory.slice(0, historyIndex + 1), newTree]);
        setHistoryIndex((prevIndex) => prevIndex + 1);
    }, [historyIndex]);

    const handleUndo = useCallback(() => {
        if (historyIndex > 0) {
            setHistoryIndex((prev) => prev - 1);
        }
    }, [historyIndex]);

    const handleRedo = useCallback(() => {
        if (historyIndex < history.length - 1) {
            setHistoryIndex((prev) => prev + 1);
        }
    }, [historyIndex, history.length]);

    // --- Keyboard Shortcuts (Ctrl+Z / Ctrl+Y) ---
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
                if (e.shiftKey){
                    handleRedo();
                }else{
                    handleUndo();
                }
            } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
                handleRedo();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleUndo, handleRedo]);

    // Persist versions
    useEffect(() => {
        if (builder.version?.save) {
            builder.version.save(versions);
        }
    }, [versions, builder]);

    // Tree validity
    const isValid = useMemo(() => builder.isTreeValid(activeTree), [builder, activeTree]);

    // --- External Event & Change Propagation ---
    useEffect(() => {
        if (window.helpers?.react?.hooks?.event?.emit) {
            window.helpers.react.hooks.event.emit(builder.id, {
                json: activeTree,
                valid: isValid,
            });
        }

        if (onChange) {
            onChange(activeTree, isValid);
        }
    }, [activeTree, isValid, builder.id, onChange]);

    // Preview event propagation
    useEffect(() => {
        const previewEvent = builder.utils?.eventNames?.preview || 'preview:toggle';
        if (window.helpers?.react?.hooks?.event?.emit) {
            window.helpers.react.hooks.event.emit(previewEvent, { preview });
        }
    }, [preview, builder]);

    // --- Action Handlers ---
    const handleUpdate = (id, updater) => {
        commitTreeChange(builder.updateNode(activeTree, id, updater));
    };

    const handleDelete = (id) => {
        commitTreeChange(builder.deleteNode(activeTree, id));
    };

    const handleAddChild = (parentId, child) => {
        commitTreeChange(builder.addChildNode(activeTree, parentId, child));
    };

    const handleAddRootField = () => {
        commitTreeChange([...activeTree, builder.createNode('', 'string')]);
    };

    // Determine which list of nodes to render (search filtered vs full tree)
    const displayNodes = searchResults !== null ? searchResults : activeTree;

    return (
        <div className="full bxs bg-c00101 pd-16 bdr-1 bdr-c00104 bdr-8">
            {/* Header Bar */}
            <div className="full bxs pd-b16">
                <div className="full flx-full flx-sb">
                    <h3 className="bxs txt-sm fm-md flx-full">Schema Field Editor</h3>
                    <ul className="flx flx-vc gap-8">
                        <li className="fl">
                            <span
                                className="ico-18 cp ico-g-plus"
                                data-tip-html="Add Root Field"
                                onClick={handleAddRootField}
                            />
                        </li>
                        <li className="fl">
                            <span
                                className={`ico-18 cp ico-g-eye${preview ? '-off' : ''}`}
                                data-tip-html={preview ? 'Hide Preview' : 'Show Preview'}
                                onClick={() => setPreview((prev) => !prev)}
                            />
                        </li>
                    </ul>
                </div>
                {!isValid && (
                    <span className="txt-xxs mr-t8 txt-c00306 db">
                        ⚠️ Resolve empty or duplicate keys before compiling
                    </span>
                )}
            </div>

            {/* Control Strip: Search & History */}
            <div className="full flx-vc grid-wrapper pd-b12">
                <div className="grid-w6">
                    <Input
                        clearable={true}
                        value={searchQuery}
                        placeholder="Search schema..."
                        callback={{
                            onChangeStart: (val) => setSearchQuery(val || ''),
                        }}
                    />
                </div>
                <div className="grid-w6 flx-sb flx-vc bxs pd-rl16">
                    <div className="flx gap-12">
                        <span
                            className={`cp txt-xs ${historyIndex === 0 ? 'txt-c00104 not-allowed' : 'txt-c00107'}`}
                            onClick={handleUndo}
                        >
                            Undo
                        </span>
                        <span
                            className={`cp txt-xs ${historyIndex >= history.length - 1 ? 'txt-c00104 not-allowed' : 'txt-c00107'}`}
                            onClick={handleRedo}
                        >
                            Redo
                        </span>
                    </div>

                    <span
                        className="cp txt-xs txt-c00107 link"
                        onClick={() => setShowVersions(true)}
                    >
                        Versions ({versions.length})
                    </span>
                </div>
            </div>

            {/* Node Rows List */}
            <div className="full bxs">
                {displayNodes.length === 0 ? (
                    <div className="full txt-c pd-20 txt-xs txt-c00104">
                        {isSearching ? 'Searching...' : 'No matching fields found.'}
                    </div>
                ) : (
                    displayNodes.map((node, index) => (
                        <NodeRow
                            depth={0}
                            key={node.id}
                            node={node}
                            index={index}
                            parentType="object"
                            builder={builder}
                            entireTree={activeTree}
                            onUpdate={handleUpdate}
                            onDelete={handleDelete}
                            onAddChild={handleAddChild}
                            templates={templates}
                            searchQuery={searchQuery}
                            getIconByType={getIconByType}
                            isSiblingKeyDuplicateFn={builder.isDuplicate}
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
                    onChange={(newVersions) => setVersions(newVersions)}
                    onClose={() => setShowVersions(false)}
                    onRestore={(restoredTree) => {
                        commitTreeChange(restoredTree);
                        setShowVersions(false);
                    }}
                />
            )}
        </div>
    );
};

export default Comp;