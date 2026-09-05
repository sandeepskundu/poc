

import helpers from 'ui-helpers';
import {useDropzone} from 'react-dropzone';
import React, { useEffect, useState, createElement} from 'react';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({
        validator:null
    }, dprops);

    let files = {
        form:{
            accepted:{}
        },
        raw:{
            rejected:{},
            accepted:{}
        },
        base64:{
            rejected:{},
            accepted:{}
        }
    };

    const [formd, setFormd] = useState(null);
    let formData = new FormData();

    useEffect(() => {
        console.log(formd);
    }, [formd])

    const base64 = async (file, index, type) => {
        let reader = new FileReader();
            reader.onload = () => {
                
                files.raw = files.raw || {};
                files.base64 = files.base64 || {};

                files.raw[type] = files.raw[type] || {};                
                files.base64[type] = files.base64[type] || {};

                files.raw[type][index] = file;                
                files.base64[type][index] = reader.result;
            };
            
            reader.readAsDataURL(file);
    }

    const onDrop = async (accepted, rejected, arg2) => {
        accepted.map((file, i) => {
            base64(file, i, 'accepted');
            formData.append('images_0', file);
            formData.append('images_1', file);
        });

        rejected.map((file, i) => {
            base64(file, i, 'rejected');
        });

        //formData.append('body', JSON.stringify({data:{a:'sandeep'}}));
        formData.append('body', JSON.stringify({data:[{a:'sandeep'}, {b:'kundu'}]}));

        const res = await fetch('http://localhost:2800/api/tdc-backend/masterData/details/v1/images/create/djs?p=sk', {
            method: 'POST',
            body:formData,
        });

        const data = await res.json();

        console.log(data, formData)
    }

    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject
    } = useDropzone({
        disabled:false,
        maxFiles:6,
        useFsAccessApi:true,
        onDrop:onDrop,
        validator:helpers.json.val(props, 'validator', null),
    });

    

    

    

    

    

  const acceptedFileItems = [].map(file => (
    

    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const fileRejectionItems = [].map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map(e => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

    return (
        <section className="container">
            <div {...getRootProps({ className: 'dropzone', isFocused, isDragAccept, isDragReject})}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
                <em>(Only files with name less than 20 characters will be accepted)</em>
            </div>
            <aside>
                <h4>Accepted files</h4>
                <ul>{acceptedFileItems}</ul>
                <h4>Rejected files</h4>
                <ul>{fileRejectionItems}</ul>
            </aside>
        </section>
    );
}

export default Comp;