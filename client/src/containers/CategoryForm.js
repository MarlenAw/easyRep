import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../actions';
import Navbar from '../components/Navbar';

class CategoryForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      redirectHome: false
    };

    this.selectCategory = this.selectCategory.bind(this);
  }

  componentDidMount() {
    const properPath = 'home';
    const prevPath = this.props.pathHistory;

    if (
      prevPath[0] !== properPath ||
      this.props.page !== 1 ||
      prevPath.length !== 1
    ) {
      this.setState({ redirectHome: true });
    }
  }

  selectCategory(e) {
    e.preventDefault();
    const categorySelected = e.target.category.value;
    this.props.changeCategory(categorySelected);
    this.props.changeSymptoms(categorySelected);

    this.props.countPages(this.props.page, 'next');

    const newHistory = this.props.pathHistory;
    newHistory.push('categories');
    this.props.addToHistory(newHistory);

    this.setState({ redirect: true });
  }

  renderList() {
    return this.props.categories.map(category => {
      return (
        <li key={category.name}>
          <div className="fl tc w-50 w-50-ns pa3">
            <form onSubmit={this.selectCategory}>
              <label className="f4">{category.name}</label>
              <br />
              <input type="hidden" name="category" value={category.name} />
              <button
                className="hover-bg-orange bg-white pv2 h4 w4 w5-ns br4"
                type="submit"
              >
                <img
                  alt={category.alt}
                  className="h3 w3 tc"
                  src={category.icon}
                />
              </button>
            </form>
          </div>
        </li>
      );
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/symptoms" />;
    } else if (this.state.redirectHome) {
      return <Redirect to="/" />;
    }

    return (
      <div className="w-100">
        <Navbar />
      <div className="mw7 center ph3-ns">
        <div className="cf ph2-ns">
          <ul className="tc">{this.renderList()}</ul>
        </div>
      </div>
    </div>
    );
  }
}

const mapStateToProps = ({ categories, page, pathHistory }) => ({
  categories,
  page,
  pathHistory
});

const mapDispatchToProps = dispatch => ({
  changeCategory: category => dispatch(actions.chooseCategory(category)),
  changeSymptoms: category => dispatch(actions.renderSymptoms(category)),
  countPages: (page, direction) =>
    dispatch(actions.pageCounter(page, direction)),
  addToHistory: history => dispatch(actions.recordHistory(history))
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryForm);
