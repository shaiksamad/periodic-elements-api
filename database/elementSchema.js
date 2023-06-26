const mongoose = require("mongoose");


const elementSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },

    symbol: {
        type: String,
        require: true
    },

    atomicNumber: {
        type: Number,
        require: true
    },

    atomicMass: {
        type: String,
        require: true,
        alias: "atomicWeight"
    },

    atomicRadius: {
        type: String,
        require: true
    },

    groupBlock: {
        type: String,
        require: true,
        alias: 'type'
    },

    block: {
        type: String,
        require: true
    },

    period: {
        type: Number,
        require: true
    },

    group: {
        type: Number,
        require: true
    },

    meltingPoint: {
        type: String,
        require: true
    },

    boilingPoint: {
        type: String,
        require: true
    },

    density: {
        type: String,
        require: true
    },

    electronicConfiguration: {
        type: String,
        require: true
    },

    electronegativity: {
        type: String,
        require: true
    },

    ionRadius: {
        type: String,
        require: true
    },

    electronAffinity: {
        type: String,
        require: true
    },

    oxidationStates: {
        type: String,
        require: true
    },

    standardState: {
        type: String,
        require: true
    },

    bondingType: {
        type: String,
        require: true
    },

    vanDerWaalsRadius: {
        type: String,
        require: true
    },

    ionizationEnergy: {
        type: String,
        require: true
    },

    yearDiscovered: {
        type: String,
        require: true
    },

    cpkHexColor: {
        type: String,
        require: true
    },

},
{
    versionKey: false
})

// elementSchema.alias(elementSchema.atomicWeight, 'atomicMass')

module.exports = Elements = mongoose.model("Element", elementSchema)
