import SelectBox from 'aio-global-ui/atoms/form/select-box';

export default {
	title:"Atoms/Form/SelectBox",
	component:SelectBox,
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"Select box storybook<br/><br /><strong>Import path:</strong><code>import SelectBox from 'aio-global-ui/atoms/form/select-box';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/form/select-box/index</code><br/><br/>"
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
		placeholder:'',
		asterisk:false,
		optionTemplate:'',
		noDefaultRightIcon:false,
		active:false,
		openOnHover:false,
		selected:{

		},
		optionDs:{
			attrs:{

			},
			element:"div",
			dataAttrs:{

			},
			ds:{
				othersS:{
					odd:{
						default:{
							theme:{
								colorPairing:{
									default:"022",
									hover:"007"
								}
							}
						}
					},
					even:{
						default:{
							theme:{
								colorPairing:{
									default:"032",
									hover:"039"
								}
							}
						}
					},
					last:{
						default:{
							theme:{
								colorPairing:{
									default:"033",
									hover:"032"
								}
							}
						}
					}
				},
				indexBasisS:{
					0:{
						default:{
							theme:{
								colorPairing:{
									default:"046",
									hover:"012"
								}
							}
						},
						selected:{
							theme:{
								colorPairing:{
									default:"011",
									hover:"012"
								}
							}
						}
					}
				},
				default:{
					theme:{
						colorPairing:{
							_default:"027",
							hover:"000"
						}
					},
					css:{
						class:{
							padding:{
								1:10,
								2:10,
								3:10,
								4:10
							}
						}
					}
				},
				selected:{
					theme:{
						colorPairing:{
							default:"026"
						}
					}
				}
			}
		},
		rightIconDs:{

		},
		keyMapping:{
			label:"label",
			selection:"id"
		},
		lableProps:{
			label:'',
			placeholder:'',
			asterisk:true,
			attrs:{

			},
			theme:{

			},
			inputDs:{

			},
			dataAttrs:{

			},
			wrapperDs:{

			},
			leftLayer:'',
			rightLayer:'',
			inputWrapperDs:{

			},
			leftLayerDs:{
				css:{

				},
				theme:{

				},
				attrs:{

				},
				dataAttrs:{

				}
			},
			rightLayerDs:{
				css:{

				},
				theme:{

				},
				attrs:{

				},
				dataAttrs:{

				}
			},
			onBlur:false,
			onFocus:false,
			onChange:false
		},
		contentProps:{
			bodyDs:{
				css:{
					class:{
						padding:{
							2:0,
							4:0
						}
					}
				}
			},
			wrapperDs:{

			},
			popupShadow:"lg",
			popupClassName:'',
			popupBorderRadius:8,
			wrapperElement:"div",
			popupAlignFrom:"left",
			popupColorPairing:"025"
		},
		attrs:{

		},
		dataAttrs:{

		}
	}
}