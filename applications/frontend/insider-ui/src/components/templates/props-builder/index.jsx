import schema from './schema';
import helpers from 'ui-helpers';
import React, {useEffect, useState, useRef} from 'react';

const types = {
    1:{
        "id":"string",
        "label":"String"
    }, 
    2:{
        "id":"design-system",
        "label":"Design system"
    },
    3:{
        "id":"extended-design-system",
        "label":"Extended Design system"
    },
    4:{
        "id":"object",
        "label":"Object"
    },
    5:{
        'id':"boolean",
        "label":"Boolean"
    },
    6:{
        'id':"function",
        "label":"Function"
    },
    7:{
        'id':"jsx",
        "label":"JSX element"
    },
    8:{
        'id':"enum",
        "label":"Enums"
    },
    9:{
        'id':"number",
        "label":"Number"
    }
}

const pschema = {
    compInfo:{
        "cmsDetails":{
            name:'Header'
        },
        "description":"Details description about component."
    },
    props:{
        ds:{
            config:{
                type:'object',
                required:false, // true|false
                map:'', // Map mean from where to fetch data
                schema:'', // Schema mean from where to fetch schem data,
                description:"Details description about prop"
            },
            
            value:{
                config:{

                },
                value:{
                    validation:{
                        config:{
                            "value":{
                                type:'string',
                                map:'', // Map mean from where to fetch data
                                schema:'', // Schema mean from where to fetch schem data
                                description:"Details description about prop"
                            },
                            "valid":{
                                type:'boolean',
                                map:'', // Map mean from where to fetch data
                                schema:'', // Schema mean from where to fetch schem data
                                description:"Details description about prop"
                            },
                            "error":{
                                type:'boolean',
                                map:'', // Map mean from where to fetch data
                                schema:'', // Schema mean from where to fetch schem data
                                description:"Details description about prop"
                            },
                            "message":{
                                type:'string',
                                map:'', // Map mean from where to fetch data
                                schema:'', // Schema mean from where to fetch schem data
                                description:"Details description about prop"
                            }
                        },
                        value:{
                            value:'',
                            valid:true,
                            error:false,
                            message:'',
                            validation:{
                                config:{
                                    "checks":{
                                        type:"object",
                                        map:'',
                                        schema:'',
                                        description:"Details description about prop"
                                    }
                                },
                                value:{
                                    checks:{
                                        "regex":"",
                                        "enums":"",
                                        "minlength":0,
                                        "maxlength":1000,
                                        "required":""
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

const PropsBuilder = (dprops) => {
    const props = helpers.element.jsx.props.define({
        data:{},
        schema:pschema,
    }, dprops);


    const jeditor = () => {
        // Initialize the editor with a JSON schema
      var _editor = new JSONEditor(document.getElementById('editor_holder'),{
        schema: {
          type: "object",
          title: "Text",
          required: ["fontSize","color","font","weight","possibleFonts"],
          properties: {
            fontSize: {
              format: "choices",
              type: "integer",
              enum: [10,11,12,14,16,18,20,22,24,36,48,60,72,100],
              default: 24,
              options: {
                choices_options: {
                  shouldSort: false
                }
              }
            },
            color: {
              type: "string",
              format: "choices",
              enum: ["black","red","green","blue","yellow","orange","purple","brown","white","cyan","magenta"]
            },
            font: {
              type: "string",
              format: "choices",
              enumSource: "possible_fonts",
              watch: {
                "possible_fonts": "root.possibleFonts"
              }
            },
            weight: {
              type: "string",
              format: "choices",
              enum: ["normal","bold","bolder","lighter"],
              options: {
                enum_titles: ["Normal (400)","Bold (700)","Bolder (900)","Lighter (200)"]
              }
            },
            possibleFonts: {
              type: "array",
              format: "choices",
              uniqueItems: true,
              items: {
                type: "string"
              },
              default: ["Arial","Times","Helvetica","Comic Sans"]
            }
          }
        },
        startval: {
          color: "red"
        }
      });



      // Initialize the editor
    var editor = new JSONEditor(document.getElementById('editor_holder'),{
        theme: 'spectre',
        iconlib: 'spectre',
        // The schema for the editor
        schema: {
            title: "Person",
            $ref: "#/definitions/person",
            definitions: {
                person: {
                    type: "object",
                    id: "person",
                    // The object will start with only these properties
                    defaultProperties: [
                        "fname",
                        "lname",
                        "bestFriend",
                        "coworkers"
                    ],
                    patternProperties: {
                      // Self-referntial schema in patternProperties
                      "^cousin_[0-9]+$": {
                        $ref: "#/definitions/person"
                      }
                    },
                    properties: {
                        fname: {
                            title: "first name",
                            type: "string"
                        },
                        lname: {
                            title: "last name",
                            type: "string"
                        },
                        bestFriend: {
                          title: "best friend",
                          oneOf: [
                            {
                              title: "none",
                              type: "null"
                            },
                            // Self-referential schema as 2nd choice in oneOf
                            {
                              title: "person",
                              $ref: "#/definitions/person"
                            }
                          ]
                        },
                        coworkers: {
                          type: "array",
                          // Self-referential schema in array items
                          items: {
                            title: "Coworker",
                            $ref: "#/definitions/person"
                          }
                        },
                        // Self-referential schemas in non-default properties
                        mother: {
                          title: "mother",
                          $ref: "#/definitions/person"
                        }
                    }
                },
                year: {
                    type: "integer",
                    pattern: "^[0-9]{4}$",
                    minimum: 1900,
                    maximum: 2100
                }
            }
        }
    });

    // Hook up the submit button to log to the console
    document.getElementById('submit').addEventListener('click',function() {
        // Get the value from the editor
        console.log(editor.getValue());
    });

    // Hook up the Restore to Default button
    document.getElementById('restore').addEventListener('click',function() {
        editor.setValue(starting_value);
    });

    // Hook up the enable/disable button
    document.getElementById('enable_disable').addEventListener('click',function() {
        // Enable form
        if(!editor.isEnabled()) {
            editor.enable();
        }
        // Disable form
        else {
            editor.disable();
        }
    });

    // Hook up the validation indicator to update its
    // status whenever the editor changes
    editor.on('change',function() {
        // Get an array of errors from the validator
        var errors = editor.validate();

        var indicator = document.getElementById('valid_indicator');

        // Not valid
        if(errors.length) {
            indicator.className = 'label label-danger'
            indicator.textContent = "not valid";
        }
        // Valid
        else {
            indicator.className = 'label label-success'
            indicator.textContent = "valid";
        }
    });
    }

    const header = () => {
        return (
            <div className='full'>
                <p className='layout bxs dis-xs fm-sb ns'>{helpers.json.val(props, 'schema.compInfo.cmsDetails.name')} Props details</p>
            </div>
        )
    }

    return (
        <>
            <div className='full pd-16'>
                {header()}
                {setTimeout(() => {
                    jeditor()
                })}
                <div id='editor_holder'></div>
                <button id='submit'>Submit (console.log)</button>
            </div>
        </>
    )

}

export default PropsBuilder;