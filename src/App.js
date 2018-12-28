import React, { Component } from "react";
import * as tf from "@tensorflow/tfjs";
import "./App.css";

class App extends Component {
  state = {
    message: "",
    epochs: 10,
    xs: [1, 2, 3, 4],
    xy: [1, 3, 5, 7]
  };

  calc = () => {
    const val1 = Number(document.getElementById("num1").value);

    // Define a model for linear regression.
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

    // Prepare the model for training: Specify the loss and the optimizer.
    model.compile({ loss: "meanSquaredError", optimizer: "sgd" });

    // Generate some synthetic data for training.
    const xs = tf.tensor2d(this.state.xs, [this.state.xs.length, 1]);
    const ys = tf.tensor2d(this.state.xy, [this.state.xy.length, 1]);

    // Train the model using the data.
    model.fit(xs, ys, { epochs: this.state.epochs }).then(() => {
      // Use the model to do inference on a data point the model hasn't seen before:
      const result = model.predict(tf.tensor2d([val1], [1, 1]));
      const readable_output = result.dataSync();
      const fixedOutput = Number(readable_output).toFixed(6);
      this.setState({ message: fixedOutput });
    });
  };

  render() {
    return (
      <div className="App">
        <div style={{ padding: 50 }}>
          <h1>Calculate linear regression</h1>
          <label>Training data xs: {this.state.xs.toString()}</label>
          <br />
          <label>Training data xy: {this.state.xy.toString()}</label>
          <br />
          <br />
          <label>Epochs: {this.state.epochs}</label>
          <br />
          <br />
          <label>Give a number: </label>
          <input id="num1" type="number" min="0" max="99" defaultValue="0" style={{textAlign: 'center'}} />
          <br />
          <br />
          <input type="button" onClick={this.calc} value="Calculate" />
          <br />
          <br />
          <div>Regression point:</div>
          <p style={{ fontSize: 16, fontWeight: "bold" }}>
            {this.state.message}
          </p>
        </div>
      </div>
    );
  }
}

export default App;
