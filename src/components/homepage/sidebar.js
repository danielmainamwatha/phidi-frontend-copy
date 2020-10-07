import React, { Component } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import CategoriesService from './../../services/categories';

class Sidebar extends Component {
    state = {
        categories: [],
        jobPostTitle: null,
        selectedOptions: null,
    }

    componentDidMount() {
        this.fetchCategories();
    }

    fetchCategories = async () => {
        const categories = await CategoriesService.fetchCategories();
        if (categories && categories.data.categories) {
            this.setState({categories: categories.data.categories});
        }
    }

    handleCategorySelect = (selectedOptions) => {
        const { fetchJobPostsActionCreator } = this.props;
        this.setState(() => ({selectedOptions}));
        fetchJobPostsActionCreator(selectedOptions, this.state.jobPostTitle);
    }

    handleTitleInput = (e) => {
        e.preventDefault();
        const { fetchJobPostsActionCreator } = this.props;
		const name = e.target.name;
        const value = e.target.value;

        this.setState({[name]: value.trim()},
            () => fetchJobPostsActionCreator(this.state.selectedOptions, this.state.jobPostTitle)
        );
    }

    render() {
        const animatedComponents = makeAnimated();
        const selectStyles = { 
            menu: styles => ({ 
                ...styles, 
                zIndex: 999,
                fontSize: '15px',
                border: 'none',
                boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
            }),
            control: (styles) => ({
            ...styles,
            fontSize: '15px',
            border: 'none',
            boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
            overflow: 'scroll',
            flexDirection: 'horizontal',
            }),
        };

        const options = this.state.categories.map((eachCategory) => {
            return {id: eachCategory.id, value: eachCategory.category, label: eachCategory.category}
        });
        
        return (
            <div class="sidebar-container ">
                <div class="sidebar-widget">
                    <h3 >Title</h3>
                    <input type="text" name="jobPostTitle" class="keyword-input" onInput={this.handleTitleInput} placeholder="project title"/>
                </div>
                <div class="sidebar-widget">
                    <h3 >Deliverable</h3>
                    <Select className="basic-single" isClearable={true} isMulti options={options} components={animatedComponents} styles={selectStyles} onChange={this.handleCategorySelect}/>
                </div>
                <div class="clearfix"></div>

            </div>
            );
        }  
}

export default Sidebar;