import mongoose from "mongoose";

const PoliciesDocumentSchema = mongoose.Schema(
    {
        type: {
            type: String,
        },
        file: {
            type: String
        },
    });

const PoliciesDocument = mongoose.model('PoliciesDocument', PoliciesDocumentSchema)

export default PoliciesDocument