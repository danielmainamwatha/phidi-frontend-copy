/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';
import "react-sweet-progress/lib/style.css";
import baseUrl from './../../helpers/baseURL';
import Lightbox from "react-awesome-lightbox";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import {JOB_VISIBILITY_PRIVATE} from '../../helpers/constants';
import "react-awesome-lightbox/build/style.css";
import 'react-accessible-accordion/dist/fancy-example.css';


class JobPostDetails extends Component {

    state = {
        jobPostState: {
            lightBoxShown: false,
            imageLink: null,
        }
    }

    componentDidMount() {
        const {jobPostState} = this.props;
        this.setState({jobPostState});
    }

    static getDerivedStateFromProps (nextProps, prevState) {
        if (nextProps !== prevState) {
			return { jobPostState: nextProps.jobPostState };
        }
    }
    
    showUploadedFiles = (FilesObject) => {
        const Files = [];
        if (FilesObject) {
            for (const file of FilesObject) {
                Files.push(<a class="attachment-box ripple-effect"><span>{file.name}</span><i>{file.type}</i></a>);
            }
            return Files;
        } else {
            return <span>--</span>;
        }
    }

    viewOnLightBox = (imageLink) => {
        this.setState({lightBoxShown: true, imageLink})
    }

    closeLightBox = () => {
        this.setState({lightBoxShown: false})
    }

    render() {
        const {jobPostState, lightBoxShown, imageLink} = this.state;
        return(
            <div class="boxed-list compact-list-layout margin-bottom-60">
                <div class="listings-container compact-list-layout">
                        { jobPostState ? 
                         <a class="job-listing">
                            <div class="job-listing-details">
                                <div class="job-listing-description">
                                <h3 style={{width: '100%', fontWeight: 700}} class="job-listing-title d-flex justify-content-between"><span>Project Details</span> </h3>
                                    <div class="job-listing-footer">
                                    <div class="job-listing-description">
                                        <div style={{color: '#2a41e8'}} class="job-listing-title">Visibility</div>
                                        {jobPostState.visibility === JOB_VISIBILITY_PRIVATE ? 
                                            'private' 
                                                : 
                                            'public'
                                        }
                                    </div> 
                                    </div>
                                </div>
                            </div>
                        </a>
                        : null}

                    { jobPostState && jobPostState.projectUsers ? 
                        <a  class="job-listing">
                        <div class="job-listing-details">
                            <div class="job-listing-description">
                                <h3 style={{width: '100%', fontWeight: 700}} class="job-listing-title d-flex justify-content-between"><span>Users</span></h3>

                                <div class="job-listing-footer">
                                <Accordion allowZeroExpanded>
                                        <AccordionItem>
                                            <AccordionItemHeading>
                                                <AccordionItemButton>
                                                    List of project users and their details.
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <div class="boxed-list-item">
                                                    <ul class="boxed-list-ul">
                                                        {jobPostState.projectUsers && jobPostState.projectUsers.length > 0 ? 
                                                        jobPostState.projectUsers.map(
                                                            (eachUser, index) => (
                                                                <div class="job-listing-description margin-bottom-20">
                                                                    <div class="job-listing-title margin-bottom-5"><strong>({index + 1}). {eachUser.name}</strong></div>
                                                                    <div style={{paddingLeft: '20px'}}>
                                                                        <div style={{color: '#2a41e8'}} class="job-listing-title">Description</div>
                                                                        <div class="job-listing-title margin-bottom-5">{eachUser.description ? eachUser.description : '--'}</div>
                                                                        <div style={{color: '#2a41e8'}} class="job-listing-title">User Needs</div>
                                                                        <div class="job-listing-title">{eachUser.painPoint ? eachUser.painPoint : '--'}</div>
                                                                    </div>
                                                                </div> )
                                                        )
                                                        : <span>no users added</span> }
                                                        
                                                    </ul>
                                                </div>
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                    </Accordion>
                                </div>
                            </div>
                        </div>
                    </a>
                    : null }

                    { jobPostState && jobPostState.projectKeyFeatures ? 
                       <a  class="job-listing">
                        <div class="job-listing-details">
                            <div class="job-listing-description">
                                <h3 style={{width: '100%', fontWeight: 700}} class="job-listing-title d-flex justify-content-between"><span>Features</span></h3>
                                
                                <div class="job-listing-footer">
                                <Accordion allowZeroExpanded>
                                        <AccordionItem>
                                            <AccordionItemHeading>
                                                <AccordionItemButton>
                                                    List of project features and their details.
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <div class="boxed-list-item">
                                                    <ul class="boxed-list-ul">
                                                    {jobPostState.projectKeyFeatures && jobPostState.projectKeyFeatures.length > 0 ? 
                                                        jobPostState.projectKeyFeatures.map(
                                                            (eachFeature, index) => (
                                                                <div class="job-listing-description margin-bottom-20">
                                                                    <div class="job-listing-title margin-bottom-5"><strong> ({index + 1}). {eachFeature.name}</strong></div>
                                                                    <div style={{paddingLeft: '20px'}}>
                                                                        <div style={{color: '#2a41e8'}} class="job-listing-title">Description</div>
                                                                        <div class="job-listing-title margin-bottom-5">{eachFeature.description ? eachFeature.description : '--'}</div>
                                                                    </div>
                                                                </div> )
                                                            )
                                                            
                                                        : <span>no features added</span> }
                                                        </ul>
                                                    </div>
                                                </AccordionItemPanel>
                                            </AccordionItem>
                                        </Accordion>
                                    </div>
                                </div>
                            </div>
                        </a>
                    : null }

                    { jobPostState && jobPostState.metricsOfSuccess ? 
                         <a class="job-listing">
                            <div class="job-listing-details">
                                <div class="job-listing-description">
                                    <h3 style={{width: '100%', fontWeight: 700}} class="job-listing-title d-flex justify-content-between"> <span>Metrics Of Success</span></h3>

                                <div class="job-listing-footer">
                                <Accordion allowZeroExpanded>
                                        <AccordionItem>
                                            <AccordionItemHeading>
                                                <AccordionItemButton>
                                                    List of Metrics Of Success for this project.
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <div class="boxed-list-item">
                                                    <ul class="boxed-list-ul">
                                                    {jobPostState.metricsOfSuccess && jobPostState.metricsOfSuccess.length > 0 ?
                                                        jobPostState.metricsOfSuccess.map(
                                                            (eachMetric, index) => (
                                                                <div class="job-listing-description">
                                                                    <div class="job-listing-title margin-bottom-5">{eachMetric ? <span>({index + 1}). {eachMetric}</span> : '--'}</div>
                                                                </div> )
                                                            )
                                                            : <span>no metrics of Success added</span> }
                                                            
                                                        </ul>
                                                    </div>
                                                </AccordionItemPanel>
                                            </AccordionItem>
                                        </Accordion>
                                    </div>
                                </div>
                            </div>
                        </a>
                    : null }
                    { jobPostState ? 
                        <a class="job-listing">
                            <div class="job-listing-details">
                                <div class="job-listing-description">
                                <h3 style={{width: '100%', fontWeight: 700}} class="job-listing-title d-flex justify-content-between"><span>Form and Aesthetics</span></h3>
                                    {lightBoxShown && imageLink ?   
                                        <Lightbox onClose={this.closeLightBox} image={`${baseUrl()}/${imageLink}`} title={`${imageLink}`} />
                                    : null}
                                    <div class="job-listing-footer">
                                        <div style={{color: '#2a41e8'}} class="job-listing-title margin-bottom-10 margin-top-20">Aesthetic Sketches or 3D Models</div>
                                                {jobPostState.aestheticSketches && jobPostState.aestheticSketches.length > 0 ? 
                                                    <div class="attachments-container">
                                                            
                                                        <div class="container">
                                                            <div class="row">
                                                            {jobPostState.aestheticSketches.map((eachFile, index) => {
                                                                return <div class="col-xl-4 col-md-6">
                                                                            <a onClick={() => this.viewOnLightBox(eachFile)} class="photo-box small" style={{backgroundImage: `url(${baseUrl()}/${eachFile})`}}>
                                                                                <div class="photo-box-content">
                                                                                    <i style={{fontSize: '250%', color: '#ffffff'}} class="icon-feather-zoom-in"></i>
                                                                                </div>
                                                                            </a>
                                                                        </div>
                                                                    })}
                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                                    : '--'}
                                        <div style={{color: '#2a41e8'}} class="job-listing-title margin-bottom-10 margin-top-20">Dimensional Sketches</div>
                                            <div class="attachments-container">
                                            {jobPostState.dimensionalSketches && jobPostState.dimensionalSketches.length > 0 ? 
                                                    <div class="attachments-container">
                                                        {jobPostState.dimensionalSketches.map((eachFile, index) => {
                                                            return <div class="col-xl-4 col-md-6">
                                                                    <a onClick={() => this.viewOnLightBox(eachFile)} class="photo-box small" style={{backgroundImage: `url(${baseUrl()}/${eachFile})`}}>
                                                                        <div class="photo-box-content">
                                                                            <i style={{fontSize: '250%', color: '#ffffff'}} class="icon-feather-zoom-in"></i>
                                                                        </div>
                                                                    </a>
                                                                </div>
                                                        })}
                                                    </div>
                                                    : '--'}
                                            </div>
                                        <div style={{color: '#2a41e8'}} class="job-listing-title margin-bottom-10 margin-top-50">Preffered Materials</div>
                                            <p>{jobPostState.prefferedMaterials ? jobPostState.prefferedMaterials : '--'}</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    : null }

                        {jobPostState ?
                        <a class="job-listing">
                            <div class="job-listing-details">
                                <div class="job-listing-description">
                                    <h3 style={{width: '100%', fontWeight: 700}} class="job-listing-title d-flex justify-content-between"> <span>Project Details</span> </h3>
                                    <div class="job-listing-footer">
                                    <div style={{color: '#2a41e8'}} class="job-listing-title">Budget</div>
                                        <p>{jobPostState.budget ? jobPostState.budget : '--'}</p>
                                    </div>
                                    <div class="job-listing-footer">
                                    <div style={{color: '#2a41e8'}} class="job-listing-title margin-bottom-10 margin-top-20">Deliverables</div>
                                    {jobPostState.categories && jobPostState.categories.length > 0 ? 
                                            <div class="job-listing-title">{jobPostState.categories.map((eachCategory) => (<span>{ eachCategory.category} ,</span>))}</div> 
                                                : 
                                            '--'
                                        }
                                    </div>
                                    <div class="job-listing-footer">
                                    <div style={{color: '#2a41e8'}} class="job-listing-title margin-bottom-10 margin-top-20">Project Milestones</div>
                                        <Accordion allowZeroExpanded>
                                            <AccordionItem>
                                                <AccordionItemHeading>
                                                    <AccordionItemButton>
                                                        List of Project Milestones.
                                                    </AccordionItemButton>
                                                </AccordionItemHeading>
                                                    <AccordionItemPanel>
                                                        <div class="boxed-list-item">
                                                            <ul class="boxed-list-ul">
                                                            {jobPostState.milestones && jobPostState.milestones.length > 0 ?
                                                                jobPostState.milestones.map(
                                                                    (eachMilestone) => (
                                                                        <div class="job-listing-description margin-bottom-30">
                                                                            <div style={{color: '#2a41e8'}} class="job-listing-title">Date</div>
                                                                            <div class="job-listing-title margin-bottom-5">{eachMilestone.date ? eachMilestone.date : '--'}</div>
                                                                            <div style={{color: '#2a41e8'}} class="job-listing-title">Milestone</div>
                                                                            <div class="job-listing-title margin-bottom-5">{eachMilestone.milestone ? eachMilestone.milestone : '--'}</div>
                                                                        </div> )
                                                                    )
                                                                : <span>no project milestones added</span> }
                                                            </ul>
                                                        </div>
                                                    </AccordionItemPanel>
                                            </AccordionItem>
                                        </Accordion>
                                    </div>
                                </div>
                            </div>
                        </a> 
                        : null }
                </div>
            </div>
        );
    }
}

export default JobPostDetails;