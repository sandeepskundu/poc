import Badge from 'aio-global-ui/atoms/0/badge';

export default {
	title:"Atoms/0/Badge",
	component:Badge,
	parameters:{
		layout:"centered",
		docs:{
			description:{
				component:"Button<br/><br /><strong>Import path:</strong><code>import Badge from 'aio-global-ui/atoms/0/badge';</code><br /><strong>Component directory:</strong><code>./libs/frontend/ui/components/atoms/0/badge/index</code><br/><br/>"
			}
		}
	},
	tags:['autodocs'],
	argTypes:{

	}
}

export const Base = {
	args:{
		content:'',
		dsTheme:{
			size:'',
			radius:"4"
		},
		theme:{
			colorPairing:{
				default:"000",
				hover:"001"
			}
		},
		avatar:{
			colorPairing:{
				left:'',
				right:''
			}
		},
		config:{
			icons:{
				left:{
					ds:{
						css:{

						},
						theme:{
							border:{

							},
							background:{

							},
							colorPairing:{

							}
						}
					},
					svg:{

					},
					attrs:{

					},
					markup:{

					},
					type:"font",
					icon:{
						name:"a-down"
					}
				},
				right:{
					ds:{
						css:{

						},
						theme:{
							border:{

							},
							background:{

							},
							colorPairing:{

							}
						}
					},
					svg:{

					},
					attrs:{

					},
					markup:{

					},
					type:"font",
					icon:{
						name:"a-down"
					}
				}
			},
			content:{
				attrs:{

				},
				markup:{
					element:"p"
				},
				ds:{
					css:{

					},
					theme:{
						border:{

						},
						background:{

						},
						colorPairing:{

						}
					}
				}
			},
			wrapper:{
				attrs:{

				},
				markup:{
					element:"div"
				},
				ds:{
					css:{

					},
					theme:{
						border:{

						},
						background:{

						},
						colorPairing:{

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