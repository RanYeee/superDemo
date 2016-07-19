//
//  AreaDataBaseOpreation.h
//  ElectronicPrescribing
//
//  Created by Ducky on 16/5/4.
//  Copyright © 2016年 Rany. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "FMDB.h"

@interface AreaDataBaseOpreation : NSObject

-(instancetype)initWithDataBase:(FMDatabase  *) dataBase;

-(NSMutableArray *)getProviceDataFromDB;

-(NSMutableArray *)getCityDataFromDB:(int)father_id;

-(NSMutableArray *)getAreaDataFromDB:(int)father_id;

@end
