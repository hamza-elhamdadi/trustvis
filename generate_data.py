import numpy as np
from scipy.stats import multivariate_normal
import sys, os


def generate_data(correlation):
    x_range = np.array([5,100]) #price

    y_range = np.array([45,95])

    means = [x_range.mean(), y_range.mean()]
    stds = [x_range.std() / 3, y_range.std() / 3]

    covs = [[stds[0]**2, stds[0]*stds[1]*correlation],
            [stds[0]*stds[1]*correlation, stds[1]**2]]

    generator = multivariate_normal(means, covs)

    out = generator.rvs(size=100, random_state=12345).tolist()

    return out

if __name__ == '__main__':
    correlation = 0.5
    x_range = np.array([5,100]) #price

    y_range = np.array([45,95])

    means = [x_range.mean(), y_range.mean()]
    stds = [x_range.std() / 3, y_range.std() / 3]

    covs = [[stds[0]**2, stds[0]*stds[1]*correlation],
            [stds[0]*stds[1]*correlation, stds[1]**2]]
    print(means)
    print(stds)
    print(covs)

if __name__ == '__main__1':
    if len(sys.argv) < 2:
        sys.exit()
    else:
        consultant = sys.argv[1]

    print(consultant)

    x_range = np.array([5,100])           #price
    y_range = np.array([1,45]) if consultant == 'Y' else np.array([45,95]) #percentage of tickets sold

    means = [x_range.mean(), y_range.mean()]
    stds = [x_range.std() / 3, y_range.std() / 3]

    correlation = -0.8 if consultant == 'Y' else 0.8

    covs = [[stds[0]**2, stds[0]*stds[1]*correlation],
            [stds[0]*stds[1]*correlation, stds[1]**2]]

    data = np.random.multivariate_normal(means, covs, 500)

    print(data.shape)

    np.savetxt(f'./data/consultant_data_{consultant}_alternate.csv', data, comments='', header='x,y', delimiter=',', fmt='%1.3f')

    plt.scatter(data[:,0],data[:,1])
    plt.show()