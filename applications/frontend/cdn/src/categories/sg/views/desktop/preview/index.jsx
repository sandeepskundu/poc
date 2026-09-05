import ReactDragListView from 'react-drag-listview';
import React, {useEffect, useState, useRef} from 'react';

const DESKTOPSRP = (propsny) => {
    const [data, setData] = useState([
        {
            title:"Item 1"
        }, {
            title:"Item 2"
        }]);
    
    const dragProps = {
          onDragEnd(fromIndex, toIndex) {
            const d = [...data];
            const item = d.splice(fromIndex, 1)[0];
            d.splice(toIndex, 0, item);
            setData(d);
          },
          nodeSelector: 'li',
          handleSelector: 'a'
    };

    return (
      <ReactDragListView {...dragProps}>
        <ul>
          {data.map((item, index) => (
            <li key={index} className='full pd-tb16'>
              {item.title}
              <a href="#">Drag</a>
            </li>
          ))}
        </ul>
      </ReactDragListView>
    );
}

export default DESKTOPSRP;