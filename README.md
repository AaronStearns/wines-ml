# wines-ml

This project brings the predictive classification power of kNN into a Node.js environment to predict wine origin based on 13 indepentednt variables such as wine color, alcohol content, phenols, etc.

The data is available in .csv format on the UCI Machine Learning Repository at this link: https://archive.ics.uci.edu/ml/machine-learning-databases/wine/

To observe the data initially in R, I imported the file as a data frame and used the kNN algorithm in the DMwR package with k=5, normalization, and several train/test splits between 70% and 99.5% (testing on a single row) to achieve 95-100% classification accuracy. I then formatted the data frame as a JSON file, imported it into a Node.js environment, and used the Javascript library 'knearest' to accurately reproduce my results from the R environment.   
