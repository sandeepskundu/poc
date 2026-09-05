import helpers from 'ui-helpers';

const comp = (props) => {

    const themes = helpers.json.val(props, 'themes', []);

    const ui = () => {
        if(themes && themes.length > 0){
            return themes.map((item, index) => {
                return (
                    <></>
                )
            })
        }else{
            return <></>
        }
    }

    return ui();
}

export default comp;