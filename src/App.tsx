import React from 'react';

type AppState = {
  start: number;
  cards: string[];
};

export class App extends React.PureComponent<unknown, AppState> {
  private scrollRef = React.createRef<HTMLDivElement>();

  constructor(props: unknown) {
    super(props);

    const cards = [];

    for (let i = 0; i < 20; i++) {
      cards.push(`Hello I am number ${i + 1}`);
    }

    this.state = {
      start: 0,
      cards
    };
  }

  private renderCards = () => {
    const display = [];

    for (let i = 0; i < 5; i++) {
      const current = this.state.cards[(this.state.start + i) % this.state.cards.length];
      display.push(
        <div className='card' key={`card-${i}`}>
          <div className='card-body'>
            {current}
          </div>
        </div>
      );
    }

    return display;
  };

  private increment = () => {
    this.setState({
      start: this.state.start + 1
    });
  };

  private decrement = () => {
    this.setState({
      start: this.state.start - 1
    });
  };

  private handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.stopPropagation();

    if (event.deltaY > 0) {
      this.increment();
    } else {
      this.decrement();
    }
  };

  public render = () => (
    <div className='container'>
      <div className='row mt-5'>
        <div className='col'>
          <h1>Scrolling area proof of concept</h1>
          <p>Scrollable area</p>
          <div
            className='p-3 border border-primary d-flex justify-content-between'
            onWheel={this.handleWheel}
            ref={this.scrollRef}
          >
            {this.renderCards()}
          </div>
        </div>
      </div>
    </div>
  );
}