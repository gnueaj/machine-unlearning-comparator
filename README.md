# Machine Unlearning Comparator

This tool facilitates the evaluation and comparison of machine unlearning methods by providing interactive visualizations and analytical insights. It enables a systematic examination of model behavior through privacy attacks and performance metrics, offering comprehensive analysis of various unlearning techniques.

## Demo

Try our live demo: [Machine Unlearning Comparator](https://gnueaj.github.io/Machine-Unlearning-Comparator/)

### Embedding Space
![Embedding Space](img/embeddings.png)

### Attack Simulation
![Attack Simulation](img/attack.png)

## Features

### Built-in Baseline Methods
The Machine Unlearning Comparator provides comparison of various baseline methods:
- **Fine-Tuning**: Leverages catastrophic forgetting by fine-tuning the model on remaining data with increased learning rate
- **Gradient-Ascent**: Moves in the direction of increasing loss for forget samples using negative gradients
- **Random-Labeling**: Fine-tunes the model by randomly reassigning labels for forget samples, excluding the original forget class labels

### **Custom Method Integration** ✨
**Upload and evaluate your own unlearning methods!** The comparator supports custom implementations, enabling you to:
- **Benchmark** your novel approaches against established baselines
- **Upload** your custom unlearning implementations for comparison
- **Compare** results using standardized evaluation metrics and privacy attacks

It includes various visualizations and evaluations through privacy attacks to assess the effectiveness of each method.

## How to Start

### Backend

1. **Install Dependencies Using Hatch**
   ```shell
   hatch shell
   ```

2. **Start the Backend Server**
   ```shell
   hatch run start
   ```

### Frontend

1. **Install Dependencies Using pnpm**
   ```shell
   pnpm install
   ```

2. **Start the Frontend Server**
   ```shell
   pnpm start
   ```
   
## Related Resources
- [ResNet18 CIFAR-10 Unlearning Models on Hugging Face](https://huggingface.co/jaeunglee/resnet18-cifar10-unlearning)
