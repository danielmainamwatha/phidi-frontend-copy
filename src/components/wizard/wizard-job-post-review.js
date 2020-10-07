/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';
import "react-sweet-progress/lib/style.css";
import baseUrl from './../../helpers/baseURL';
import {Link} from 'react-router-dom';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import {JOB_VISIBILITY_PRIVATE} from '../../helpers/constants';
 
import 'react-accessible-accordion/dist/fancy-example.css';

class ReviewComponent extends Component {

    state = {
        jobPostState: {

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
                Files.push(<a style={{backgroundImage: `url("${baseUrl()}/${file}")`}} class="attachment-box ripple-effect"><span style={{ background: '#ffffff'}}>{file.name ? file.name : file}</span><i>{file.type}</i></a>);
            }
            return Files;
        } else {
            return <span>--</span>;
        }
    }

    render() {
        const {jobPostState} = this.state;
        return(
            <div class="boxed-list margin-bottom-60">
                <div class="boxed-list-headline">
                    <h3><i class="icon-material-outline-assignment"></i> Review Project Details</h3>
                </div>

                <div class="listings-container compact-list-layout">
                        <a class="job-listing">
                            <div class="job-listing-details">
                                <div class="job-listing-description">
                                <h3 style={{width: '100%'}} class="job-listing-title d-flex justify-content-between"><span>Objective</span> <Link to={{pathname: '/wizard/', state: {edit: true}}}><span style={{fontSize: '15px', color: '#2a41e8'}}><i  class="icon-feather-edit-3"></i> Edit</span></Link></h3>
                                    <div class="job-listing-footer">
                                        <p>{jobPostState.objective ? jobPostState.objective : '--'}</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                        <a class="job-listing">
                            <div class="job-listing-details">
                                <div class="job-listing-description">
                                <h3 style={{width: '100%'}} class="job-listing-title d-flex justify-content-between"><span>Project Details</span> <Link to={{pathname: '/wizard/job-post-details', state: {edit: true}}}><span style={{fontSize: '15px', color: '#2a41e8'}}><i  class="icon-feather-edit-3"></i> Edit</span></Link></h3>
                                    <div class="job-listing-footer">
                                    <div class="job-listing-description">
                                        <div style={{color: '#2a41e8'}} class="job-listing-title">Project Description</div>
                                        <div class="job-listing-title margin-bottom-5">{jobPostState.toggleObjective ? jobPostState.toggleObjective : '--'}</div>
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

                        <a  class="job-listing">
                        <div class="job-listing-details">
                            <div class="job-listing-description">
                                <h3 style={{width: '100%'}} class="job-listing-title d-flex justify-content-between"><span>Users</span> <Link to={{pathname: '/wizard/users', state: {edit: true}}}><span style={{fontSize: '15px', color: '#2a41e8'}}><i  class="icon-feather-edit-3"></i> Edit</span></Link></h3>

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
                                                        {jobPostState.users && jobPostState.users.length > 0 ? 
                                                        jobPostState.users.map(
                                                            (eachUser) => (
                                                                <div class="job-listing-description">
                                                                    <div class="job-listing-title margin-bottom-5"><strong>{eachUser.name}</strong></div>
                                                                    <div style={{color: '#2a41e8'}} class="job-listing-title">Description</div>
                                                                    <div class="job-listing-title margin-bottom-5">{eachUser.description ? eachUser.description : '--'}</div>
                                                                    <div style={{color: '#2a41e8'}} class="job-listing-title">Pain point</div>
                                                                    <div class="job-listing-title">{eachUser.painPoint ? eachUser.painPoint : '--'}</div>
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

                        <a  class="job-listing">
                        <div class="job-listing-details">
                            <div class="job-listing-description">
                                <h3 style={{width: '100%'}} class="job-listing-title d-flex justify-content-between"><span>Features</span> <Link to={{pathname: '/wizard/key-features', state: {edit: true}}}> <span style={{fontSize: '15px', color: '#2a41e8'}}><i  class="icon-feather-edit-3"></i> Edit</span></Link></h3>
                                
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
                                                    {jobPostState.features && jobPostState.features.length > 0 ? 
                                                        jobPostState.features.map(
                                                            (eachFeature) => (
                                                                <div class="job-listing-description">
                                                                    <div class="job-listing-title margin-bottom-5"><strong>{eachFeature.name}</strong></div>
                                                                    <div style={{color: '#2a41e8'}} class="job-listing-title">Description</div>
                                                                    <div class="job-listing-title margin-bottom-5">{eachFeature.description ? eachFeature.description : '--'}</div>
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

                        <a class="job-listing">
                            <div class="job-listing-details">
                                <div class="job-listing-description">
                                    <h3 style={{width: '100%'}} class="job-listing-title d-flex justify-content-between"> <span>Metrics Of Success</span> <Link to={{pathname: '/wizard/metrics-of-success', state: {edit: true}}}><span style={{fontSize: '15px', color: '#2a41e8'}}><i  class="icon-feather-edit-3"></i> Edit</span></Link></h3>

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
                                                            (eachMetric) => (
                                                                <div class="job-listing-description">
                                                                    <div class="job-listing-title margin-bottom-5"><strong>{eachMetric ? eachMetric : '--'}</strong></div>
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

                        <a class="job-listing">
                            <div class="job-listing-details">
                                <div class="job-listing-description">
                                <h3 style={{width: '100%'}} class="job-listing-title d-flex justify-content-between"><span>Form and Aesthetics</span> <Link to={{pathname: '/wizard/aesthetics', state: {edit: true}}}> <span style={{fontSize: '15px', color: '#2a41e8'}}><i  class="icon-feather-edit-3"></i> Edit</span></Link></h3>
                                    <div class="job-listing-footer">
                                        <div style={{color: '#2a41e8'}} class="job-listing-title margin-bottom-10 margin-top-40">Aesthetic Sketches or 3D Models</div>
                                            <div class="attachments-container">
                                                {this.showUploadedFiles(jobPostState.aestheticSketches)}
                                            </div>
                                        <div style={{color: '#2a41e8'}} class="job-listing-title margin-bottom-10 margin-top-40">Dimensional Sketches</div>
                                            <div class="attachments-container">
                                                    {this.showUploadedFiles(jobPostState.dimensionalSketches)}
                                            </div>
                                        <div style={{color: '#2a41e8'}} class="job-listing-title margin-bottom-10 margin-top-40">Preffered Materials</div>
                                            <p>{jobPostState.prefferedMaterials ? jobPostState.prefferedMaterials : '--'}</p>
                                    </div>
                                </div>
                            </div>
                        </a>

                        <a class="job-listing">
                            <div class="job-listing-details">
                                <div class="job-listing-description">
                                    <h3 style={{width: '100%'}} class="job-listing-title d-flex justify-content-between"> <span>Project Details</span> <Link to={{pathname: '/wizard/project-details', state: {edit: true}}}> <span style={{fontSize: '15px', color: '#2a41e8'}}><i  class="icon-feather-edit-3"></i> Edit</span></Link></h3>
                                    <div class="job-listing-footer">
                                    <div style={{color: '#2a41e8'}} class="job-listing-title">Budget</div>
                                        <p>{jobPostState.budget ? jobPostState.budget : '--'}</p>
                                    </div>
                                    <div class="job-listing-footer">
                                    <div style={{color: '#2a41e8'}} class="job-listing-title margin-bottom-10 margin-top-20">Deliverables</div>
                                    {jobPostState.categories && jobPostState.categories.length > 0 ? 
                                            <div class="job-listing-title">{jobPostState.categories.map((eachCategory) => (<span>{ eachCategory.value} ,</span>))}</div> 
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
                                                                        <div class="job-listing-description">
                                                                            <div style={{color: '#2a41e8'}} class="job-listing-title">Date</div>
                                                                            <div class="job-listing-title margin-bottom-5">{eachMilestone.date ? eachMilestone.date : '--'}</div>
                                                                            <div style={{color: '#2a41e8'}} class="job-listing-title">Milestone</div>
                                                                            <div class="job-listing-title margin-bottom-5">{eachMilestone.milestone ? eachMilestone.milestone : '--'}</div>
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
                </div>
            </div>
        );
    }
}

export default ReviewComponent;