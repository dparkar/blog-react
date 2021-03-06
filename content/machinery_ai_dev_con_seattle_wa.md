# Machinery.AI Developer Conference (Seattle, WA)

Today, I attended the Machinery.AI Developer Conference in Seattle, WA. Highlights : 

- Affordable, incase your company is not covering. $60 registration.
- Thanks to Capital One, free swag is always cool ! (fidget spinner on a pen ?! <img src="http://boredomtherapy.com/wp-content/uploads/2017/03/01-smiling-snake-emoji.png" width="16" height="16">)

<center><img src="https://pbs.twimg.com/media/DNrvYXSVwAAcbN9.jpg" width="50%" height="50%" /></center>

- NVIDIA started their talk with an overview of the machine learning field with focus on deep learning and were quick to point out the latest AI and HPC focussed [NVIDIA Tesla V100](https://www.nvidia.com/en-us/data-center/tesla-v100/). They explained how each deep learning phase (training, modelling and inferencing) have distributed and highly parallelizable characteristics and hence a perfect fit for the GPGPU paradigm. [TensorRT](https://developer.nvidia.com/tensorrt) was specifically pointed out as perfect example of inferencing that boosts performance using GPUs. Deep learning frameworks such as MXNet, Tensorflow, CNTK and how Keras makes it easy to experiment with these frameworks was briefly discussed. The different types of machine Learning tasks  were explained with some examples : 
    - Supervised Learning
    - Unsupervised Learning
    - Reinforcement Learning
- Capital One's presentation gave an insight into the applications of machine learning within the banking industry. Fraud detection and predicting transaction labelling were two of the scenarios discussed. The rest (and most) of the talk focussed on what are the DOs and DON'Ts of machine learning. Using an example of [Fizz Buzz in Tensorflow](http://joelgrus.com/2016/05/23/fizz-buzz-in-tensorflow/) and *"everything seems like a nail when you have a hammer"* it was explained how not to apply machine learning where it's not really required. There are a lot of libraries and frameworks which can solve a good percentage of problems which may be seem like a machine learning problem at first but can be solved without using it e.g. image recognition APIs, speech recognition APIs. After you have a baseline solution using available frameworks, you can then improve the baseline solution, if required, by using machine learning. Once you decide to apply machine learning to improve the baseline solution, you can start with using linear/logistic regression models to solve the problem before using advanced features like SVM, random forests, neural networks and deep learning. Feature engineering was stressed as still the most important methodology to solve majority of the problems. For machine learning, it was explained how data wrangling is the most tedious task and since *"gravity works only one way"* how to weed out unwanted data and avoid training the model to recognize stuff that's not required. e.g. upside down giraffe or a bus. Finally, the talk focussed into deep learning and how starting with using established models and neural networks such as AlexNet, ImageNet and GoogLeNet before jumping into creating your own is a better approach. Using large neural networks tend to reduce feature engineering and small networks focus on solving subset of classification problems. To solve a problem with machine learning and small networks, try expressing the problem as a classification problem. e.g. web search can be boiled down to a labelling problem which is [why Google is infusing deep learning in its classic PageRank algorithm](https://www.wired.com/2016/02/ai-is-changing-the-technology-behind-google-searches/).
- We got a couple of hours to get hands-on experience with [DIGITS](https://developer.nvidia.com/digits) for image classification in NVIDIA lab. Here are some notes :
    - Data sets :
        - Kaggle.com
        - [UCI](https://archive.ics.uci.edu/ml/datasets.html)
        - [MNIST](http://yann.lecun.com/exdb/mnist/)
        - [Caltech 101](http://www.vision.caltech.edu/Image_Datasets/Caltech101) 
    - How networks evolve into models (image from NVIDIA):
    
    <center><img src="https://dplogscontent.blob.core.windows.net/dplogs/networks2models.png" width="50%" height="50%" /></center>

    - *"However, to start, weighing the merits of different networks would be like arguing about the performance of different cars before driving for the first time. Building a network from scratch would be like building your own car. Let's drive first. We'll get there."*
    - An **epoch** is one trip through the entire training dataset. 
    - AlexNet with Caffe was used.
    - Inferencing after models are created (image from NVIDIA):
    
    <center><img src="https://dplogscontent.blob.core.windows.net/dplogs/networks2modelsandinference.png" width="50%" height="50%" /></center>
     
    - Screenshot of inferencing written digits after creating a model by training the network with digit images. Accuracy 96.33%.
    
    <center><img src="https://dplogscontent.blob.core.windows.net/dplogs/inferencingmodel1.png" width="50%" height="50%" /></center>

    - Screenshot of inferencing random objects after creating a model by training the network with Caltech 101. Accuracy 44.6%.
    
    <center><img src="https://dplogscontent.blob.core.windows.net/dplogs/inferencingmodel2.png" width="50%" height="50%" /></center>

- Other highlights : 
    - Companies presenting machine learning applications : 
        - Dimensional Mechanics
        - CONVERSATION.ONE
        - Manzama
        - GE
    - Recommended reading : 
        - An executive guide to Machine Learning
        - Predictive Analysis - An introduction to everyone
    - Panel discussion : Ethical AI - Reducing Conscious and Unconscious Bias 