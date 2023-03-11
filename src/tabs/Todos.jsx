import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

export class Todos extends Component {
  state = {
    todos: [],
  };

  onSubmit = text => {
    const todo = { text, id: nanoid() };
    this.setState(prevState => ({ todos: [...prevState.todos, todo] }));
  };
  deleteTodo = id => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
  };
  render() {
    return (
      <>
        <SearchForm onSubmit={this.onSubmit} />
        <Grid>
          {this.state.todos.map(({ id, text }, index) => (
            <GridItem key={id}>
              <Todo
                text={text}
                count={index + 1}
                deleteTodo={this.deleteTodo}
                id={id}
              />
            </GridItem>
          ))}
        </Grid>
      </>
    );
  }
}
