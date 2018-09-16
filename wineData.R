library(dplyr)
library(DMwR)
library(jsonlite)
library(rjson)

# import data
df <- read.table('https://archive.ics.uci.edu/ml/machine-learning-databases/wine/wine.data', sep = ',')

# name columns - 'wine' is the dependent variable
colnames(df) <- c('wine', 'alcohol', 'malicAcid', 'ash', 'alcalinityOfAsh', 'magnesium', 'totalPhenols', 'flavinoids', 'nonflavinodPhenols', 'proanthocyanins', 'colorIntensity', 'hue', 'OD280OD315OfDilutedWines', 'proline')

# check the data structure, variable types
str(df)

# convert dependent variable into factor
df$wine <- as.factor(df$wine)

# because of the small size of the dataset, 
# use 99.5% of the data for training and
# test on one row
trainRows <- floor(0.995 * nrow(df))

# create a randomly sampled index of rows from the full 
# data set to serve as the split in train/test
train_ind <- sample(seq_len(nrow(df)), 
                    size = trainRows)

# create training and testing datasets
train <- df[train_ind, ]
test <- df[-train_ind, ]

nn5 <- kNN(wine ~ ., 
           train, 
           test, 
           norm = T, # normalize values from 0 to 1
           k=5)

table(test[,'wine'], nn5)

# write JSON object by row
wineJSON <- toJSON(unname(split(df, 1:nrow(df))))

write(wineJSON, file="wines.JSON")


