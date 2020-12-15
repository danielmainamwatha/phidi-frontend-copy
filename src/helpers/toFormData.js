const processToFormData = async (wizardState) => {
    let formData = new FormData();
    for (const element of Object.keys(wizardState)) {
        if ( element === "aestheticSketches" || element === "dimensionalSketches" || element === "commentSketches" || element === "bidSketches" ) {
            if (Array.isArray(wizardState[element]) && wizardState[element].length === 1) {
                formData.append(`${element}[]`, wizardState[element]);
            } else {
                for (const file of wizardState[element]) {
                    formData.append(`${element}`, file)
                }
            }
        } else if (element === "users" || element === "features" || element === "metricsOfSuccess" || element === "milestones" || element === "categories" || element === "deliverables") {
            formData.append(element, JSON.stringify(wizardState[element]));
        
        } else {
            formData.append(element, wizardState[element]);
        }
    }
    return formData;
}

export default processToFormData;