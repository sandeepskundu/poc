module.exports = {
    type:'nested',
    description:"Defines the HTML markup structure for the component. This object contains element definitions and related configuration used to generate the component's rendered HTML output.",
    ___:{
        required:false,
        nested:{
            element:{
                type:"string",
                description:"Defines the HTML tag that will be used when rendering the element. The selected element determines the semantic meaning, behavior, and structure of the generated HTML output."
            }
        }
    }
}