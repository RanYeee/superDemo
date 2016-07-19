//
//  AreaDataBaseOpreation.m
//  ElectronicPrescribing
//
//  Created by Ducky on 16/5/4.
//  Copyright © 2016年 Rany. All rights reserved.
//

#import "AreaDataBaseOpreation.h"
#import "ProvinceEntity.h"
#import "CityEntity.h"
#import "AreaEntity.h"

@interface AreaDataBaseOpreation()

@property (nonatomic,strong) NSMutableArray * pickerDatas;

@property (nonatomic,strong) FMDatabase* database;

@end

@implementation AreaDataBaseOpreation


-(instancetype)initWithDataBase:(FMDatabase *)dataBase{
    
    self = [super init];
    
    if (self) {
        
        self.database = dataBase;
        
        self.pickerDatas = [[NSMutableArray alloc] init];
        
    }
    
    return self;

}

//获取省信息，不存在返回nil
-(NSMutableArray *)getProviceDataFromDB{
    
    if (self.database) {
        
        [self.pickerDatas removeAllObjects];
        
        FMResultSet* resultSet = [ self.database executeQuery: @"select * from province" ];
        
        // 逐行读取数据
        while ( [ resultSet next ] )
        {
            ProvinceEntity * entity = [[ProvinceEntity alloc] init];
            // 对应字段来取数据
            [entity setProvince:[ resultSet stringForColumn: @"province" ]];
            [entity set_id:[ resultSet intForColumn: @"_id" ]];
            [entity setProvince_id:[ resultSet intForColumn: @"province_id" ]];

            [self.pickerDatas addObject:entity];
        }
        
    }
    return self.pickerDatas;
}

//获取城市信息
-(NSMutableArray *)getCityDataFromDB:(int)father_id {
    
    if (self.database) {
        
        [self.pickerDatas removeAllObjects];
        
        FMResultSet* resultSet = [ self.database executeQuery: @"select * from city where FATHER_ID = ?",@(father_id)];
        
        // 逐行读取数据
        while ( [ resultSet next ] )
        {
            CityEntity * entity = [[CityEntity alloc] init];
            // 对应字段来取数据

            [entity set_id:[ resultSet intForColumn: @"_id" ]];
            [entity setCity_id:[ resultSet intForColumn: @"city_id" ]];
            [entity setFather_id:[ resultSet intForColumn: @"father_id" ]];
            [entity setCity:[ resultSet stringForColumn: @"city" ]];

            [self.pickerDatas addObject:entity];
        }
        
    }
    return self.pickerDatas;
}

//获取区域信息
-(NSMutableArray *)getAreaDataFromDB:(int) father_id {
    
    if (self.database) {
        
        [self.pickerDatas removeAllObjects];
        
        FMResultSet* resultSet = [ self.database executeQuery: @"select * from area where father_id = ?",@(father_id)];
        
        // 逐行读取数据
        while ( [ resultSet next ] )
        {
            AreaEntity * entity = [[AreaEntity alloc] init];
            
            [entity set_id:[ resultSet intForColumn: @"_id" ]];
            [entity setArea_id:[ resultSet intForColumn: @"area_id" ]];
            [entity setFather_id:[ resultSet intForColumn: @"father_id" ]];
            [entity setArea:[ resultSet stringForColumn: @"area" ]];
            
            [self.pickerDatas addObject:entity];
        }
        
    }
    return self.pickerDatas;
}

@end
