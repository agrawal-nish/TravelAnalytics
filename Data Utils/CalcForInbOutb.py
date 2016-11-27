import csv
from pprint import pprint
import json

file_names=["trip_leg_matrix_2014_04_01_DDP.csv","trip_leg_matrix_2014_04_02_DDP.csv",
 "trip_leg_matrix_2014_04_03_DDP.csv", "trip_leg_matrix_2014_04_04_DDP.csv",
 "trip_leg_matrix_2014_04_05_DDP.csv", "trip_leg_matrix_2014_04_06_DDP.csv",
 "trip_leg_matrix_2014_04_07_DDP.csv", "trip_leg_matrix_2014_04_08_DDP.csv",
 "trip_leg_matrix_2014_04_09_DDP.csv", "trip_leg_matrix_2014_04_10_DDP.csv",
 "trip_leg_matrix_2014_04_11_DDP.csv", "trip_leg_matrix_2014_04_12_DDP.csv",
 "trip_leg_matrix_2014_04_13_DDP.csv", "trip_leg_matrix_2014_04_14_DDP.csv",
 "trip_leg_matrix_2014_04_15_DDP.csv", "trip_leg_matrix_2014_04_16_DDP.csv",
 "trip_leg_matrix_2014_04_17_DDP.csv", "trip_leg_matrix_2014_04_18_DDP.csv",
 "trip_leg_matrix_2014_04_19_DDP.csv", "trip_leg_matrix_2014_04_20_DDP.csv",
 "trip_leg_matrix_2014_04_21_DDP.csv", "trip_leg_matrix_2014_04_22_DDP.csv",
 "trip_leg_matrix_2014_04_23_DDP.csv", "trip_leg_matrix_2014_04_24_DDP.csv",
 "trip_leg_matrix_2014_04_25_DDP.csv", "trip_leg_matrix_2014_04_26_DDP.csv",
 "trip_leg_matrix_2014_04_27_DDP.csv", "trip_leg_matrix_2014_04_28_DDP.csv",
 "trip_leg_matrix_2014_04_29_DDP.csv", "trip_leg_matrix_2014_04_30_DDP.csv"]

file_names2=["matrix_1.csv","matrix_2.csv","matrix_3.csv",
             "matrix_4.csv","matrix_5.csv","matrix_6.csv",
             "matrix_7.csv","matrix_8.csv","matrix_9.csv",
             "matrix_10.csv","matrix_11.csv","matrix_12.csv",
             "matrix_13.csv","matrix_14.csv","matrix_15.csv",
             "matrix_16.csv","matrix_17.csv","matrix_18.csv",
             "matrix_19.csv","matrix_20.csv","matrix_21.csv",
             "matrix_22.csv","matrix_23.csv","matrix_24.csv",
             "matrix_25.csv","matrix_26.csv","matrix_27.csv",
             "matrix_28.csv","matrix_29.csv","matrix_30.csv"]
final_data={}
for item in file_names2:
    with open("..\\Data\\clean_data"+"\\"+item) as filedata:
        data=csv.reader(filedata)
        headers=next(data)
        for row in data:
            try:
                final_data[int(row[0])]["out"]=final_data[int(row[0])]["out"]+float(row[6])
                final_data[int(row[1])]["in"]=final_data[int(row[1])]["in"]+float(row[6])
            except:
                temp1={}
                temp2={}
                temp1["in"]=float(row[6])
                temp1["out"]=0
                temp2["in"]=0
                temp2["out"]=float(row[6])
                final_data[int(row[0])]=temp2;
                final_data[int(row[1])]=temp1;
for key in sorted(final_data.keys()):
    print(key,":",final_data[key])

with open("..\\Data\\InOutZoneData.json","w") as new_file:
    json.dump(final_data,new_file)
