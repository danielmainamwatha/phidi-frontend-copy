import React from 'react';

const VisibilityToggle = (props) => {
 

    const handleInput = (e) => {
        e.stopPropagation();
		const name = e.target.name;
        const value = parseInt(e.target.value);
        props.changeWizardState(name, value);
    }

    return(
        <>
            <div class="col-xl-9 col-lg-9">
                <div class="single-page-section">
                    <h3><strong>E. Post Visibility</strong></h3>
                    <p class="margin-top-40">Set the visibility of the project.</p>
                </div>

                <div class="section-headline margin-top-25 margin-bottom-12">
                </div>
                
                <div onChange={handleInput}>
                    <div  class="radio" style={{marginLeft: '20px'}}>
                        <input  id="radioPublic" name="visibility" type="radio" value="1" />
                        <label for="radioPublic"><span class="radio-label"></span> Public </label>
                    </div>

                    {/* <br> */}

                    <div class="radio" style={{marginLeft: '30px'}}>
                        <input  id="radioPrivate" name="visibility" type="radio" value="2"  />
                        <label for="radioPrivate"><span class="radio-label"></span> Private </label>
                    </div> 
                </div>

                <div class="margin-top-50 margin-bottom-50">
                </div>

            </div>
        </>
    );
}

export default VisibilityToggle;