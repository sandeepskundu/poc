module.exports = async (req) => {
    return {
        message: {
            error: {
                checks: {
                    required: "This field is required."
                }
            }
        },
        checks:{
            required:{
                value:'required'
            }
        }
    }
}