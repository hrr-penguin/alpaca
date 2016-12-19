import React from 'react';
import axios from 'axios';

export default class CustomQuiz extends React.Component {
  constructor(props) {
    super(props);

    //keep state
    this.state = {
      question: '',
      answer: '',
      option1: '',
      option2: '',
      option3: '',
      testName: '',
      currQuesList: [],
      selectedCategory: '',
      categoryList: [],
      public: false
    };
    this.clearForm = this.clearForm.bind(this);
  }

  componentDidMount() {
    axios.get('/categories')
      .then( (categories) => {
        this.setState({
          categoryList: categories.data,
          selectedCategory: categories.data[0]
        });
      });
  }

  // this actually pushes the current values to the server using a post request
  // with axios
  sendCustomTemplate(e) {
    console.log(this.state.selectedCategory);
    axios.post('/questions', {
      name: this.state.question,
      correct: this.state.answer,
      wrong1: this.state.option1,
      wrong2: this.state.option2,
      wrong3: this.state.option3,
      testName: this.state.testName,
      category: this.state.selectedCategory,
      public: this.state.public
    })
    .then((response) => {
      this.clearForm();
    });
  }

  clearForm() {
    this.refs.question.value = '';
    this.refs.correctAnswer.value = '';
    this.refs.wrong1.value = '';
    this.refs.wrong2.value = '';
    this.refs.wrong3.value = '';
  }

  // the next *handle* functions to the work of updating state variables as
  // data is typed into the input fields.
  handleQuestion(e) {
    this.setState({
      question: e.target.value
    });
  }

  handleCorrentAnswer(e) {
    this.setState({
      answer: e.target.value
    });
  }

  handleWrong1(e) {
    this.setState({
      option1: e.target.value
    });
  }

  handleWrong2(e) {
    this.setState({
      option2: e.target.value
    });
  }

  handleWrong3(e) {
    this.setState({
      option3: e.target.value
    });
  }

  handleSelectedCategory(e) {
    this.setState({
      selectedCategory: e.target.value
    });
  }

  // still handling input field text, but calling this.getTest..... to populate the
  // existing questions for the supplied test in the div to the right
  handleTestName(e) {
    this.setState({
      testName: e.target.value,
      currQuesList: [],
    }, this.getTestNameCurrentQuestions);
    console.log(this.state.testName);
  }

  handleSelectedCategory(e) {
    this.setState({
      selectedCategory: e.target.value
    });
  }

  handlePublicCheck(e) {
    this.setState({
      public: !this.state.public
    });
  }


  // getTestNameCurrentQuestions() {
  //   var entries;
  //   var config = {
  //     params: {
  //       test: this.state.testName
  //     }
  //   };

  //   axios.get('/questions', config)
  //     .then(response => {
  //       console.log();
  //       entries = response.data;
  //       var temp = [];
  //       entries.forEach(entry => {
  //         temp.push(entry.name);
  //       });
  //       this.setState({
  //         currQuesList: temp,
  //       });
  //     })
  //     .catch(function(err) {
  //       console.error(err);
  //     });
  // }

  handlePublicCheck(e) {
    this.setState({
      public: !this.state.public
    });
  }

  handleRemove(e) {
    // do something here that posts a delete request to server
    var tempName = e.target.textContent;
    this.setState({
      currQuesList: [],
    }, function() {
      axios.post('/questions', {
        delete: true,
        name: tempName,
      })
      .catch(function(err) {
        console.error(err);
      });
      this.getTestNameCurrentQuestions();
    });
  }

  render() {
    return (
      <div className="container customquiz">
        <div className="col-md-12">
          <div className='row'>
            <div className='col-md-6' >
              <h2>Build a Custom Quiz</h2>

              <form className="form-customquiz customquiz">
                <div className="form-group row">
                  <label className="col-xs-4 col-form-label" htmlFor="testName">Test Name</label>
                  <div className="col-xs-8">
                    <input name="testName" value={this.state.testName} type="text" className="form-control" placeholder="Enter the Name of this Test" onChange={this.handleTestName.bind(this)}></input>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xs-4 col-form-label" htmlFor="question">Question</label>
                  <div className="col-xs-8">
                    <input name="question" type="text" ref="question" className="form-control" placeholder="Enter a question" onChange={this.handleQuestion.bind(this)}></input>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xs-4 col-form-label" htmlFor="answer">Correct</label>
                  <div className="col-xs-8">
                    <input name="answer" type="text" ref="correctAnswer" className="form-control" placeholder="Enter an answer" onChange={this.handleCorrentAnswer.bind(this)}></input>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xs-4 col-form-label" htmlFor="option1">Wrong 1</label>
                  <div className="col-xs-8">
                    <input name="option1" type="text" ref="wrong1" className="form-control" placeholder="Enter an answer" onChange={this.handleWrong1.bind(this)}></input>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xs-4 col-form-label" htmlFor="option2">Wrong 2</label>
                  <div className="col-xs-8">
                    <input name="option2" type="text" ref="wrong2" className="form-control" placeholder="Enter an answer" onChange={this.handleWrong2.bind(this)}></input>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xs-4 col-form-label" htmlFor="option3">Wrong 3</label>
                  <div className="col-xs-8">
                    <input name="option3" type="text" ref="wrong3" className="form-control" placeholder="Enter an answer" onChange={this.handleWrong3.bind(this)}></input>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xs-4 col-form-label" htmlFor="category">Select a Category</label>
                  <div className="col-xs-8">
                    <select onChange={this.handleSelectedCategory.bind(this)} value={this.state.selectedCategory}>
                      {
                        this.state.categoryList.map( (category, item) => {
                          return (<option key={item} value={category}>{category}</option>);
                        })
                      }
                    </select>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-xs-4 col-form-label" htmlFor="public">Make quiz public?</label>
                  <div className="col-xs-8">
                    <input type="checkbox" onClick={this.handlePublicCheck.bind(this)} value={this.state.public} name="public" />
                  </div>
                </div>

                <button className="btn btn-sm btn-primary" type="button" onClick={this.sendCustomTemplate.bind(this)}>Submit Question</button>
              </form>
            </div>

            <div className='col-md-6'>
              <div>
                <h3>Click questions below to delete them once created!</h3>
                {this.state.currQuesList.map((option, i) =>
                  <button
                    key={i}
                    onClick={this.handleRemove.bind(this)}
                    className={`answer btn btn-lg ${option}`}>{option}
                  </button> )}
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
