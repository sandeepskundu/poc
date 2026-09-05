import Select from 'aio-global-ui/atoms/0/form/select';

export default {
	title:"Atoms/0/Form/Select",
	component:Select,
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"An input component is a controlled or uncontrolled field used to capture user input such as text, numbers, email, passwords, etc.<br/><br /><strong>Import path:</strong><code>import Select from 'aio-global-ui/atoms/0/form/select';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/0/form/select/index</code><br/><br/>"
			}
		}
	},
	tags:['autodocs'],
	argTypes:{

	}
}

export const Base = {
	args:{
		open:false,
		multiple:false,
		searchable:true,
		allowDeselect:true,
		closeOnSelect:true,
		selectedIcon:{
			enabled:true,
			content:null,
			placement:"end",
			iconConfig:{
				type:"font",
				icon:{
					size:20,
					name:"check"
				}
			}
		},
		filter:{
			callback:null,
			logics:{
				0:{
					mode:"includes",
					keys:['label']
				}
			},
			config:{
				match:"lowercase"
			}
		},
		keymap:{
			label:"label",
			selection:"value"
		},
		content:{
			noResult:{
				default:"No selectable items found",
				orginial:"No selectable items found",
				filtered:"No results found"
			}
		},
		templates:{
			list:null,
			trigger:null,
			noResult:{
				default:null,
				orginial:null,
				filtered:null
			}
		},
		dropdown:{
			controls:{
				arrow:false,
				mode:"react",
				toggle:"click",
				position:"bottom-right"
			}
		},
		input:{
			label:'',
			name:'',
			type:'',
			error:'',
			eye:false,
			minLength:2,
			maxlength:100,
			description:'',
			placeholder:'',
			defaultValue:'',
			debounceDelay:500,
			prefix:false,
			suffix:false,
			invalid:false,
			disabled:false,
			required:false,
			readonly:false,
			clearable:true
		},
		callback:{
			onOpen:null,
			onClose:null,
			onSelect:null,
			onRemove:null,
			onChange:{
				afterFilter:null,
				beforeFilter:null,
				afterListUpdate:null
			},
			input:{
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
			}
		},
		dsTheme:{
			input:{
				icons:{

				},
				description:{

				}
			},
			dropdown:{
				wrapper:{

				},
				content:{
					radius:"6",
					shadow:"md",
					border:"c00103",
					background:"c00000"
				},
				noResult:{
					default:{
						color:"c00306",
						font__d__size:"xs"
					},
					orginial:{

					},
					filtered:{

					}
				}
			},
			listBox:{
				boxWrapper:{
					color:'',
					border:'',
					shadow:'',
					background:''
				},
				item:{
					default:{
						end:{
							color:"c12307"
						},
						after:{

						},
						start:{

						},
						before:{

						},
						center:{

						},
						wrapper:{
							color:"c00108",
							hcolor:"c00109",
							background:"c00000",
							hbackground:"c00102"
						}
					},
					selected:{
						end:{
							color:"c00506"
						},
						after:{

						},
						start:{

						},
						before:{

						},
						center:{

						},
						wrapper:{
							background:"c00101"
						}
					}
				}
			}
		},
		config:{
			input:{
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
								default:{

								},
								invalid:{

								},
								focused:{

								},
								readonly:{

								},
								disabled:{

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
							name:"check"
						},
						ds:{
							css:{

							},
							theme:{
								filled:{

								},
								default:{

								},
								invalid:{

								},
								focused:{

								},
								readonly:{

								},
								disabled:{

								}
							}
						}
					},
					clear:{

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
							default:{

							},
							invalid:{

							},
							focused:{

							},
							readonly:{

							},
							disabled:{

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
							default:{

							},
							invalid:{

							},
							focused:{

							},
							readonly:{

							},
							disabled:{

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
							default:{

							},
							invalid:{

							},
							focused:{

							},
							readonly:{

							},
							disabled:{

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
							default:{

							},
							invalid:{

							},
							focused:{

							},
							readonly:{

							},
							disabled:{

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
							default:{

							},
							invalid:{

							},
							focused:{

							},
							readonly:{

							},
							disabled:{

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
							default:{

							},
							invalid:{

							},
							ocused:{

							},
							readonly:{

							},
							disabled:{

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
							default:{

							},
							invalid:{

							},
							ocused:{

							},
							readonly:{

							},
							disabled:{

							}
						}
					}
				}
			},
			dropdown:{
				content:{
					ds:{
						css:{
							class:{
								padding:{

								}
							}
						}
					}
				},
				wrapper:{
					markup:{
						element:"div"
					},
					ds:{
						css:{
							class:{
								padding:{

								}
							}
						}
					}
				},
				noResult:{
					default:{
						markup:{
							element:"p"
						},
						ds:{
							css:{
								class:{
									padding:{
										1:10,
										2:10
									}
								}
							}
						}
					},
					orginial:{

					},
					filtered:{

					}
				}
			},
			listBox:{
				item:{
					default:{
						end:{

						},
						after:{

						},
						start:{

						},
						before:{

						},
						center:{

						},
						wrapper:{
							ds:{
								css:{
									class:{
										padding:{
											1:10,
											2:8
										}
									}
								}
							}
						}
					}
				},
				group:{
					end:{

					},
					after:{

					},
					start:{

					},
					before:{

					},
					center:{

					},
					wrapper:{

					}
				},
				boxWrapper:{
					markup:{
						element:"ol"
					},
					ds:{
						css:{
							class:{
								borderNone:{
									1:true,
									2:true,
									3:true,
									4:true
								}
							}
						}
					}
				}
			}
		},
		option:{
			list:{

			},
			selected:{

			}
		},
		attrs:{

		},
		dataAttrs:{

		}
	}
}