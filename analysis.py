import pandas as pd, os, json, csv, collections, glob, numpy as np

data_path = 'responses/final_study/*.json'
old_data_paths = ['responses/pilot_study_1', 'responses/pilot_study_2', 'responses/pilot_study_3', 'responses/final_study']

trusts = ['A Little Trustworthy', 'Slightly Trustworthy', 'Somewhat Trustworthy', 'Neither Trustworthy Nor Untrustworthy', 'Moderately Trustworthy', 'Very Trustworthy', 'To A Large Extent Trustworthy']
efforts = ['Very Easy', 'Slightly Easy', 'Moderately Easy', 'Medium', 'Slightly Hard', 'Moderately Hard', 'Very Hard']
conditions = ['Blur', 'Transparency', 'Outline', 'Grid Lines', 'Scale', 'Overlap']
condition_keys = list(map(lambda x: x.lower().replace(' ', '-'), conditions))
actual_keys = list(map(lambda l : 'actual-' + l, condition_keys))
effort_keys = list(map(lambda l : l + '-effort', condition_keys))

trust_vals = {
        'A Little Trustworthy': 0,
        'Slightly Trustworthy': 1,
        'Somewhat Trustworthy': 2,
        'Neither Trustworthy Nor Untrustworthy': 3,
        'Moderately Trustworthy': 4,
        'Very Trustworthy': 5,
        'To A Large Extent Trustworthy': 6
    }

effort_vals = {
    'Very Easy': 0,
    'Slightly Easy': 1,
    'Moderately Easy': 2,
    'Medium': 3,
    'Slightly Hard': 4,
    'Moderately Hard': 5,
    'Very Hard': 6
},
education_vals = {
    'Less than high school degree': 0,
    'High school graduate (high school diploma or equivalent including GED)': 1,
    'Some college but no degree': 2,
    'Associate degree in college (2-year)' : 3,
    'Bachelor\'s degree in college (4-year)': 4,
    'Master\'s degree': 5,
    'Doctoral degree': 6,
    'Professional degree (JD, MD)': 7
}

if __name__ == '__main__1':

    files = os.listdir(data_path)

    for path in old_data_paths:
        old_files = os.listdir(path)
        for file in old_files:
            if file in files:
                os.remove(os.path.join(data_path, file))

if __name__ == '__main__1':
    files = glob.glob(data_path)
    
    dframes = []

    #pd.set_option("display.max_rows", None, "display.max_columns", None)

    for file in files:
        with open(file, 'r') as f:
            data = pd.json_normalize(json.load(f))
            if not data.loc[0]['disqualified']:
                dframes.append(data)
        
    pd.concat(dframes).to_csv('responses/final_study/results.csv')

if __name__ == '__main__1':
    df = pd.read_csv(os.path.join(data_path, 'results.csv'))
    time_cols = ['prolific-id'] + [col for col in df if col.startswith('time')]
    
    print('Average Percent of Tickets with Camouflage: ', df['percent-tickets-camouflaged'].mean())
    print('Average Percent of Tickets without Camouflage: ', df['percent-tickets-default'].mean())
    print()

    for condition in conditions:
        where_condition = df.loc[df['study-condition'] == condition]

        avg_trust_condition = where_condition['trust-camouflaged'].apply(lambda x: trust_vals[x]).mean()
        avg_trust_nocondition = where_condition['trust-default'].apply(lambda x: trust_vals[x]).mean()

        print('Average Trust with ', condition, ': ', round(avg_trust_condition, 1), ' - ', trusts[round(avg_trust_condition)])
        print('Average Trust without Camouflage Compared to ', condition, ': ', round(avg_trust_nocondition, 1), ' - ', trusts[round(avg_trust_nocondition)])
        print()

    condition_vals = df[condition_keys].applymap(lambda l: int(l[:-1]))
    actual_vals = df[actual_keys].applymap(lambda l: float(l[:-1]))

    print('Average Effort:')
    print(round(df[effort_keys].applymap(lambda x: effort_vals[x]).mean()).map(lambda l: efforts[int(l)]))

    stds = []

    print()
    for i in range(len(conditions)):
        subtractions = actual_vals[actual_keys[i]] - condition_vals[condition_keys[i]]

        #print(subtractions)
        print('Average ', conditions[i], ' Difference: ', round(abs(subtractions).mean(), 1))
        print('Std ', conditions[i], ' Difference: ', round(abs(subtractions).std(), 1))
        stds.append(round(abs(subtractions).std(), 1))
        print()
    
    print(pd.DataFrame(stds).mean())
    
if __name__ == '__main__':
    #df = pd.read_csv('responses/second_experiment/results.csv')
    df = pd.read_csv('responses/second_experiment/relevant_columns.csv')
    #df = pd.read_csv('responses/final_study/results.csv')
    #df = df.iloc[: , 1:]

    #demographic_info = ['contrast-test-response', 'education-level', 'gender', 'age', 'distance-from-monitor', 'interpretation-of-goals']

    #pd.set_option("display.max_rows", None, "display.max_columns", None)

    #gender_responses = df['gender'].unique()
    #contrast_responses = df['contrast-test-response'].unique()

    #for g in gender_responses:
    #    data = df['age'].loc[df['gender'] == g]
    #    print(data.shape[0])
    #    print(g, ': ( M =', data.mean(), ', SD = ', data.std(), ')')
    #    print(g, ': ', df[demographic_info].loc[df['gender'] == g].shape[0])
    
    #print(df['age'].mean(), df['age'].std())

    #for c in contrast_responses:
    #    print(c, ': ', df.loc[df['contrast-test-response'] == c].shape[0])

    #def inch_to_cent(string):
    #    val, units = string.split(' ')
    #    val = int(val) if units == 'centimeters' else 2.54*int(val)
    #    return val

    #dist = list(map(lambda l: inch_to_cent(l), df['distance-from-monitor'].to_numpy()))

    #dist = np.array(dist)

    #print(dist.mean(), dist.std())

    #print(df['education-level'].apply(lambda x: education_vals[x]).std())
    
    camouflage_types = df['camouflageCondition'].unique()


    for camo in camouflage_types:
        effort = df.loc[df['camouflageCondition'] == camo]['effort_numeric']
        print(camo, ': ( M = ', effort.mean(), ', SD = ', effort.std(), ')\\\\')

