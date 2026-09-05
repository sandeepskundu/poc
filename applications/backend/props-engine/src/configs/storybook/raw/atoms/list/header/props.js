const helpers = process.uiHelpers();
const itemProps = require('./../item/props');

module.exports = helpers.json.merge(itemProps, {
    config:{
        ___:{
            nested:{
                wrapper:{
                    ___:{
                        predefined:{
                            overwirte:{
                                ds:{
                                    ___:{
                                        nested:{
                                            predefined:{
                                                ___:{
                                                    predefined:{
                                                        overwirte:{
                                                            font__d__size:{
                                                                dvalue:'md'
                                                            },
                                                            className:{
                                                                dvalue:'item-header bdr-1 bxs full'
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
                    }
                }
            }
        }
    }
});