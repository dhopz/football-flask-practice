from operator import itemgetter
from itertools import groupby
from functools import partial

def del_ret(d, key):
    del d[key]
    return d

def create_fixtures(newdict):
    fixture_dict = []
    for date in newdict:
        formatdict = {}
        formatdict["date"] = date
        formatdict["fixtures"] = newdict[date]
        fixture_dict.append(formatdict)        
    return fixture_dict

def format_fixtures(results):
	return dict(map(lambda k_v: (k_v[0], tuple(map(partial(del_ret, key="date"), k_v[1]))),groupby(results, itemgetter("date"))))