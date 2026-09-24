import helpers from 'ui-helpers';
import {useState, useEffect} from 'react';
import Input from 'aio-global-raw-ui/atoms/form/input';
import Button from 'aio-global-raw-ui/atoms/form/button';
import Textarea from 'aio-global-raw-ui/atoms/form/textarea';
import SlideDrawer from 'aio-global-raw-ui/molecules/slide-drawer';

const rId = helpers.random.key();

const Comp = (props) => {
    const tree = props.tree;
    const builder = props.builder;
    const [tag, setTag] = useState('');
    const [desc, setDesc] = useState('');
    const [versions, setVersions] = useState(() => builder.version.load());

    useEffect(() => {
        builder.version.save(versions);

        if(props.onChange){
            props.onChange(versions);   
        }
    }, [versions]);

    const restore = (arg) => {
        if(window.confirm(`Restore schema to checkpoint "${arg.version}"?`)) {
            if(props.onRestore){
                props.onRestore(JSON.parse(JSON.stringify(arg.tree)))
            }
        }
    };

    const deletev = (id) => {
        setVersions((prev) => prev.filter((v) => v.id !== id));
    };

    const save = () => {
        if(!tag.trim()){
            return;
        };
        setVersions((prev) => [builder.version.create(tree, tag.trim(), desc.trim()), ...prev]);
        setTag('');
        setDesc('');
    };

    const list = () => {
        if(versions.length === 0){

        }else{
            return versions.map((arg, i) => {
                return (
                    <li className='full bxs pd-rl16 pd-tb10 bdr-1 bdr-c00104 bdr-tn bdr-rn bdr-ln grid-wrapper' key={`${rId}${i}`}>
                        <div className='grid-w11 bxs'>
                            <p className='full bxs txt-sm flx-vc'>
                                <span className='fm-sb'>{arg.version}</span>
                                <span className='fm-rg txt-xxs mr-l10 txt-c00105'>{new Date(arg.timestamp).toLocaleString()}</span>
                            </p>
                            {arg.description && (<p className='full bxs txt-xs mr-t8'>{arg.description}</p>)}
                        </div>
                        <div className='grid-w1'>
                            <span onClick={() => restore(arg)}>Restore</span>
                            <span onClick={() => deletev(arg.id)}>Delete</span>
                        </div>
                    </li>
                )
            })
        }
    }

    const button = () => {
        if((tag && desc) || 1 === 1){
            return (
                <li>
                    <Button 
                        button={{
                            content:"Save"
                        }}
                        callback={{
                            onClick:save
                        }}
                    />
                </li>
            )   
        }
    }

    const createui = () => {
        return (
            <ul className='full bxs pd-rl16'>
                <li className='full bxs pd-b20'>
                    <Input
                        key={tag}
                        value={tag}
                        clearable={true}
                        placeholder="Search schema..."
                        callback={{
                            onChangeEnd:(val) => {
                                setTag(val);
                            }
                        }}
                    />
                </li>
                <li className='full bxs pd-b20'>
                    <Textarea 
                        key={desc}
                        value={desc}
                        placeholder="Description"
                        callback={{
                            onChangeEnd:(val) => {
                                setDesc(val);
                            }
                        }}
                    />
                </li>
                {button()}
            </ul>
        )
    }

    const content = () => {
        return (
            <div className='full bxs pd-tb20' style={{width:'450px'}}>
                {createui()}
                <ul className='full bxs'>
                    {list()}
                </ul>
            </div>
        )
    }

    const ui = () => {
        return (
            <SlideDrawer 
                pageview={false}
                direction="right"
                active={props.show}
                templates={{
                    body:() => {return content()}
                }}
                callbacks={{
                    onClose:() => {
                        debugger;
                    }
                }}
            />
        );
    }

    return ui();
}

export default Comp;