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

new_final_data={}
for i,item in enumerate(file_names2):
    final_data={}
    with open("..\\Data\\clean_data"+"\\"+item) as filedata:
        data=csv.reader(filedata)
        headers=next(data)
        for row in data:
            try:
                final_data[row[0]]["out"]=final_data[row[0]]["out"]+float(row[6])
                
            except:
                temp2={}
                try:
                    temp2["in"]=final_data[row[1]]["in"]+float(row[6])
                except:
                    temp2["in"]=0
                temp2["out"]=float(row[6])
                final_data[row[0]]=temp2;
                
            try:
                final_data[row[1]]["in"]=final_data[row[1]]["in"]+float(row[6])
            except Exception:
                temp1={}
                temp1["in"]=float(row[6])
                try:
                    temp1["out"]=final_data[row[0]]["out"]+float(row[6])
                except:
                    temp["out"]=0
                final_data[row[1]]=temp1;

    filedata.close()

    for key in final_data:
        final_data[key]["in"]=round(final_data[key]["in"])
        final_data[key]["out"]=round(final_data[key]["out"])

    print("here")
    with open("..\\Data\\clean_data"+"\\"+item) as filedata:
        data=csv.reader(filedata)
        headers=next(data)
##        curr_dict={"in":0,"out":0,"Home Worker":0,"Inbound Commuter":0,"Short Term Visitor":0,"Long Term Visitor":0,"Resident Worker":0,"Outbound Commuter":0}
##        curr_dict["in"]=final_data[key]["in"]
##        curr_dict["out"]=final_data[key]["out"]
        for row in data:
            curr_dict=final_data[row[0]]
            try:
                curr_dict[row[4]]=curr_dict[row[4]]+1
            except:
                curr_dict[row[4]]=0
            final_data[row[0]]=curr_dict

        filedata.close()
    keylist=["Home Worker","Inbound Commuter","Short Term Visitor","Long Term Visitor","Resident Worker","Outbound Commuter"]
    for key in final_data:
        curr_list=final_data[key]
        for item in keylist:
            if item not in curr_list:
                curr_list[item]=0
        final_data[key]=curr_list    

##    if(i==0):
##        print("*******************************************************")
##        for key in final_data:
##            print(key, len(final_data[key]))

    with open("..\\Data\\clean_data\\InOutZoneData_day "+str(i+1)+".csv","w",newline='') as new_file:
        writer = csv.DictWriter(new_file, fieldnames = ["TAZ_ID", "Inbound", "Outbound","Outbound Commuter","Resident Worker","Long Term Visitor","Short Term Visitor","Inbound Commuter","Home Worker"])
        writer.writeheader()
        writer.writerows({'TAZ_ID': key, 'Inbound': final_data[key]["in"], 'Outbound': final_data[key]["out"],'Outbound Commuter': final_data[key]["Outbound Commuter"],'Resident Worker': final_data[key]["Resident Worker"],'Long Term Visitor': final_data[key]["Long Term Visitor"],'Short Term Visitor': final_data[key]["Short Term Visitor"],'Inbound Commuter': final_data[key]["Inbound Commuter"],'Home Worker': final_data[key]["Home Worker"]} for key in final_data)
