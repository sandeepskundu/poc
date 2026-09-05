import ButtonGroup from 'aio-global-ui/atoms/0/form/button-group';

export default {
	title:"Atoms/0/Form/ButtonGroup",
	component:ButtonGroup,
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"Button group<br/><br /><strong>Import path:</strong><code>import ButtonGroup from 'aio-global-ui/atoms/0/form/button-group';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/0/form/button-group/index</code><br/><br/>"
			}
		}
	},
	tags:['autodocs'],
	argTypes:{

	}
}

export const Base = {
	args:{
		callback:{
			onBlur:null,
			onFocus:null,
			onPress:null,
			onClick:null,
			onPressUp:null,
			onPressEnd:null,
			onPressStart:null,
			onPressChange:null
		},
		config:{
			buttons:{
				0:{
					button:{
						content:0,
						states:{
							disabled:true
						}
					}
				},
				1:{
					button:{
						content:1,
						states:{
							active:true,
							disabled:false
						}
					}
				},
				2:{
					button:{
						content:2,
						states:{
							disabled:false
						}
					}
				}
			},
			theme:{
				default:{
					button:{
						ds:{
							predefined:{
								size:"sm",
								theme:"001"
							},
							css:{
								class:{
									shadow:"sm"
								}
							}
						},
						markup:{
							element:"label"
						}
					}
				},
				active:{
					button:{
						ds:{
							css:{

							},
							states:{

							},
							predefined:{

							}
						}
					}
				},
				disabled:{
					button:{
						ds:{
							css:{

							},
							states:{

							},
							predefined:{

							}
						}
					}
				}
			},
			wrapper:{
				attrs:{

				},
				ds:{
					theme:{
						border:{

						},
						background:{

						}
					},
					css:{
						class:{
							padding:{
								1:6,
								2:8
							}
						}
					}
				}
			}
		},
		attrs:{

		},
		dataAttrs:{

		}
	}
}