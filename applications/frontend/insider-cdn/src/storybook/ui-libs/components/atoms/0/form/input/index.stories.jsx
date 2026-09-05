import Input from 'aio-global-ui/atoms/0/form/input';

export default {
	title:"Atoms/0/Form/Input",
	component:Input,
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"An input component is a controlled or uncontrolled field used to capture user input such as text, numbers, email, passwords, etc.<br/><br /><strong>Import path:</strong><code>import Input from 'aio-global-ui/atoms/0/form/input';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/0/form/input/index</code><br/><br/>"
			}
		}
	},
	tags:['autodocs'],
	argTypes:{

	}
}

export const Base = {
	args:{
		label:'',
		name:'',
		type:"text",
		error:"Invaild",
		description:'',
		placeholder:'',
		defaultValue:'',
		eye:true,
		maxlength:100,
		minLength:2,
		debounceDelay:500,
		invalid:false,
		disabled:false,
		required:false,
		readonly:false,
		clearable:true,
		prefix:false,
		suffix:false,
		dsTheme:{
			radius:'',
			size:"xl",
			theme:"000"
		},
		callback:{
			onCut:null,
			onCopy:null,
			onBlur:null,
			onEnter:null,
			onFocus:null,
			onInput:null,
			onPaste:null,
			onSelect:null,
			onKeyUp:null,
			onKeyDown:null,
			onChange:null,
			onChangeEnd:null,
			onChangeStart:null,
			onBeforeInput:null,
			onCompositionEnd:null,
			onCompositionStart:null,
			onCompositionUpdate:null
		},
		config:{
			icons:{
				left:{
					svg:{

					},
					attrs:{

					},
					markup:{

					},
					type:"font",
					icon:{
						name:''
					},
					ds:{
						css:{

						},
						theme:{
							filled:{

							},
							invalid:{

							},
							focused:{

							},
							readonly:{

							},
							disabled:{

							},
							default:{

							}
						}
					}
				},
				right:{
					svg:{

					},
					attrs:{

					},
					markup:{

					},
					type:"font",
					icon:{
						name:''
					},
					ds:{
						css:{

						},
						theme:{
							filled:{

							},
							invalid:{

							},
							focused:{

							},
							readonly:{

							},
							disabled:{

							},
							default:{

							}
						}
					}
				},
				clear:{
					svg:{

					},
					attrs:{

					},
					markup:{

					},
					type:"font",
					icon:{
						name:''
					},
					ds:{
						css:{

						},
						theme:{
							filled:{

							},
							invalid:{

							},
							focused:{

							},
							readonly:{

							},
							disabled:{

							},
							default:{

							}
						}
					}
				}
			},
			description:{
				attrs:{

				},
				markup:{

				},
				ds:{
					css:{

					},
					theme:{
						filled:{

						},
						invalid:{

						},
						focused:{

						},
						readonly:{

						},
						disabled:{

						},
						default:{

						}
					}
				}
			},
			error:{
				attrs:{

				},
				markup:{

				},
				ds:{
					css:{

					},
					theme:{
						filled:{

						},
						invalid:{

						},
						focused:{

						},
						readonly:{

						},
						disabled:{

						},
						default:{

						}
					}
				}
			},
			label:{
				attrs:{

				},
				markup:{

				},
				ds:{
					css:{

					},
					theme:{
						filled:{

						},
						invalid:{

						},
						focused:{

						},
						readonly:{

						},
						disabled:{

						},
						default:{

						}
					}
				}
			},
			input:{
				attrs:{

				},
				markup:{

				},
				ds:{
					css:{

					},
					theme:{
						filled:{

						},
						invalid:{

						},
						focused:{

						},
						readonly:{

						},
						disabled:{

						},
						default:{

						}
					}
				}
			},
			inputWrapper:{
				attrs:{

				},
				markup:{

				},
				ds:{
					css:{

					},
					theme:{
						filled:{

						},
						invalid:{

						},
						focused:{

						},
						readonly:{

						},
						disabled:{

						},
						default:{

						}
					}
				}
			},
			wrapper:{
				attrs:{

				},
				markup:{

				},
				ds:{
					css:{

					},
					theme:{
						filled:{

						},
						invalid:{

						},
						focused:{

						},
						readonly:{

						},
						disabled:{

						},
						default:{

						}
					}
				}
			},
			asterisk:{
				attrs:{

				},
				markup:{

				},
				ds:{
					css:{

					},
					theme:{
						filled:{

						},
						invalid:{

						},
						focused:{

						},
						readonly:{

						},
						disabled:{

						},
						default:{

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