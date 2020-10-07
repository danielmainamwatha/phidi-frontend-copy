import React, { Component } from 'react';

const WizardContext = React.createContext()

class WizardProvider extends Component {
    
    state = {
        objective: '',
        letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'],
        activeLetterIndex: 0,
        percentageCompletion: 0,
        features: [],
        users: [],
        metricsOfSuccess: [],
        toggleObjective: '',
        visibility: 1,
        categories: [],
        budget: 0,
        milestones: [],
        deliverables: { Model: false, UXPrototype: false, FunctionalPrototype: false },
        prefferedMaterials: '',
        aestheticSketches: '',
        dimensionalSketches: '',
        toEdit: false
    }

    resetWizard = () => {
        this.setState({
            objective: '',
            letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'],
            activeLetterIndex: 0,
            percentageCompletion: 0,
            features: [],
            users: [],
            metricsOfSuccess: [],
            toggleObjective: '',
            visibility: 1,
            categories: [],
            budget: 0,
            milestones: [],
            deliverables: { Model: false, UXPrototype: false, FunctionalPrototype: false },
            prefferedMaterials: '',
            aestheticSketches: '',
            dimensionalSketches: '',
            toEdit: false,
            id: null,
            loading: false,
        })
    }

    setWizardValues = (values) => {
        this.setState({...values})
    }

    render() {
        const {children} = this.props;
        const {setWizardValues} = this;
        const {resetWizard} = this;

        return (
            <WizardContext.Provider value={{wizardState: this.state, setWizardValues, resetWizard}}>
                {children}
            </WizardContext.Provider>
        )
    }

}

export default WizardContext;

export { WizardProvider }