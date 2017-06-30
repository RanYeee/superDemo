//
//  EDrug.m
//  ElectronicPrescribing
//
//  Created by Ducky on 2016/11/4.
//  Copyright © 2016年 Rany. All rights reserved.
//

#import "EDrug.h"
#import "NSString+intJudge.h"

@implementation EDrug

+ (instancetype)setupDrugWithDict:(NSDictionary *)dict{
    
    EDrug *model = [[EDrug alloc]init];
    
    [model setupBaseMsgByDict:dict];
    model.isNewDrug = YES;
    model.universalName = dict[@"universalName"];
    model.price = dict[@"price"];
    model.drugId = dict[@"id"];
    model.drugName = dict[@"drugName"];
    
    return model;
}

+ (instancetype)biuldupDrugMsgByDict:(NSDictionary *)dict{
    
    EDrug *model = [[EDrug alloc]init];
    
    [model setupBaseMsgByDict:dict];
    model.isNewDrug = NO;
    model.drugId = dict[@"drugHouseId"];
    model.universalName = dict[@"drugName"];
    model.patientUsed = [dict[@"patientUsed"]integerValue]==1 ? @"是" : @"否";
    model.price = [NSString stringWithFormat:@"%.1f",[dict[@"price"]doubleValue]];
    model.allCount = NSStringFromInteger([dict[@"count"]integerValue]);
    
    
    return model;
}

- (void)setupBaseMsgByDict:(NSDictionary *)dict{
    
     self.norms = dict[@"norms"];
    
    //1天3次，一次22mg
    NSString *dosage = dict[@"dosage"];
    if (!isEmptyString(dosage)) {
        //西药
        NSArray *arr;
        if ([dosage isContainsString:@"，"]) {
            
            arr = [dosage componentsSeparatedByString:@"，"];
            
        }else if([dosage isContainsString:@","]){
            
            arr = [dosage componentsSeparatedByString:@","];
            
        }
        
        self.frequency = arr.firstObject;
        NSString *breakString = [arr.lastObject substringFromIndex:2                                                                                                                              ];
        NSInteger index = [breakString judgeIntIndex];
        self.everyUnit = [breakString substringFromIndex:index];
        self.everyCount = [breakString substringToIndex:index];
        
    }
    if (!isEmptyString(dict[@"usage"])) {
        
        self.usage = dict[@"usage"];
        
    }else if (!isEmptyString(dict[@"useage"])){
        
        self.usage = dict[@"useage"];
        
    }else{
        
        self.usage = @"";
    }
    if (!isEmptyString(dict[@"unit"])) {
        
        self.allUnit = dict[@"unit"];
        
    }else if (!isEmptyString(dict[@"countUnit"])){
        
        self.allUnit = dict[@"countUnit"];
        
    }else{
        
        self.allUnit = @"";
    }
}
@end
