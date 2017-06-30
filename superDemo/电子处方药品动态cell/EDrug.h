//
//  EDrug.h
//  ElectronicPrescribing
//
//  Created by Ducky on 2016/11/4.
//  Copyright © 2016年 Rany. All rights reserved.
//

#import <Foundation/Foundation.h>


@interface EDrug : NSObject

//tip:后面** 代表中药没用到

//id (上传使用)
@property (nonatomic, copy) NSString *drugId;
//通用名
@property (nonatomic, copy) NSString *universalName;
//药品规格
@property (nonatomic, copy) NSString *norms;
//用法 **
@property (nonatomic, copy) NSString *usage;
//频次 **
@property (nonatomic, copy) NSString *frequency;
//每次数量
@property (nonatomic, copy) NSString *everyCount;
//每次单位 **
@property (nonatomic, copy) NSString *everyUnit;
//总数量 **
@property (nonatomic, copy) NSString *allCount;
//总单位 (中药用于单位)
@property (nonatomic, copy) NSString *allUnit;
//是否使用该药 **
@property (nonatomic, copy) NSString *patientUsed;
//单价 (仅中药)
@property (nonatomic, copy) NSString *price;
//药品名称 **
@property (nonatomic, copy) NSString *drugName;
//编辑处方时  用来判断是不是后面才加的药
@property (nonatomic, assign) BOOL isNewDrug;

//初始化drug  用于开处方搜索药品
+ (instancetype)setupDrugWithDict:(NSDictionary *)dict;
//用于编辑药品获取药品完整信息
+ (instancetype)biuldupDrugMsgByDict :(NSDictionary *)dict;

@end
