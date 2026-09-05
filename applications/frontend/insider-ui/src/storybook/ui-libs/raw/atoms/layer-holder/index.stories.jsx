import LayerHolder from 'aio-global-raw-ui/atoms/layer-holder';

export default {
	title:"Atoms/LayerHolder",
	argTypes:{

	},
	component:LayerHolder,
	tags:['autodocs'],
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"The Image component renders visual media from a specified source and can be customized with properties such as alternative text, dimensions, object fit, loading behavior, and styling. It helps ensure images are displayed consistently across the application while maintaining accessibility and responsive design best practices.<br/><br/><strong>Import path:</strong><code>import LayerHolder from 'aio-global-raw-ui/atoms/layer-holder';</code><br/><br/><strong>Component directory:</strong><code>./libs/frontend/ui/raw/atoms/layer-holder/index</code><br/><br/>"
			}
		}
	},
	mockdata:{
		defaults:{
			templates:{
				layer:"L",
				content:"This is sample body text and will get replaced with original content. This is sample body text and will get replaced with original content. This is sample body text and will get replaced with original content."
			},
			layer:{
				align:"tcc"
			},
			config:{
				layer:{
					ds:{
						theme:{
							background:{
								default:"c00208"
							},
							text:{
								default:"c00000"
							}
						}
					}
				}
			}
		},
		variants:{

		}
	}
}

export const Base = {
	args:{
		wrap:false,
		templates:{
			layer:"L",
			content:"This is sample body text and will get replaced with original content. This is sample body text and will get replaced with original content. This is sample body text and will get replaced with original content."
		},
		layer:{
			align:"tcc",
			size:24,
			dimensions:{
				width:'',
				height:''
			}
		},
		content:{
			bindJsComponents:true,
			wrapper:{
				markup:{
					element:"div"
				}
			},
			description:{
				text:{
					markup:{
						element:"p"
					}
				}
			},
			toggle:{
				lines:5,
				enabled:false,
				align:"al",
				label:{
					more:"Read more",
					less:"Read less"
				},
				ds:{
					markup:{
						element:"span"
					}
				}
			}
		},
		config:{
			wrapper:{
				markup:{
					element:"div"
				}
			},
			container:{
				markup:{
					element:"div"
				}
			},
			content:{
				markup:{
					element:"div"
				}
			},
			layer:{
				markup:{
					element:"div"
				},
				ds:{
					theme:{
						background:{
							default:"c00208"
						},
						text:{
							default:"c00000"
						}
					}
				}
			}
		}
	}
}