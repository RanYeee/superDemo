//
//  KLAddressPickerView.m
//  ElectronicPrescribing
//
//  Created by Rany on 16/7/18.
//  Copyright © 2016年 Rany. All rights reserved.
//

#import "KLAddressPickerView.h"
#import "ProvinceEntity.h"
#import "CityEntity.h"
#import "AreaEntity.h"
#import "AreaDataBaseOpreation.h"
#define DB_NAME  @"smartmedical.db"

@interface KLAddressPickerView()

{
    AddressSelectCompleteBlock _completeBlock;
}

@property (nonatomic,strong) NSString * area;//所在区域

@property (nonatomic,strong) NSMutableDictionary *areaDict; //所在区域字典

@property (nonatomic,strong) NSString * addressInfo;//详细地址

@property (nonatomic,strong) NSString * receiver;//收货人

@property (nonatomic,strong) NSString * phone;//联系号码

@property(nonatomic) int provinceId;//省份编码

@property(nonatomic) int cityId;//市编码

@property(nonatomic) int areaId;//区域编码

@property (nonatomic,strong) NSMutableArray * pickerDatas;

@property (nonatomic,strong) AreaDataBaseOpreation * dbOpreation;

@end

@implementation KLAddressPickerView

- (instancetype)initAddressPickerWithSelectComplete:(AddressSelectCompleteBlock)complete
{
    self = [super init];
    
    if (self) {
        
        _completeBlock = complete;
        
        self.areaDict = [NSMutableDictionary dictionary];
        
        self.pickerView = [[ComPickerView alloc] initWithClickDateButton:^(NSString *type, NSObject *result) {
            
            [self displayAddressMsg:type andResult:result];
            
        
            
        } withDelagateSource:self];
        
        [self initDataBase];
        
    }
    
    return self;
}

- (void)show
{
    if (self.dbOpreation) {
        
        self.pickerDatas = [self.dbOpreation getProviceDataFromDB];
        
        [self.pickerView readLoadDatas:self.pickerDatas];
        
        [self.areaDict removeAllObjects];
    }

    [self.pickerView show];
}

- (void)hide
{
    [self.pickerView hide];
    
    [self.areaDict removeAllObjects];

}

//处理地址信息
-(void)displayAddressMsg:(NSString *)type andResult:(NSObject *)result{
    
    NSMutableArray *tmpArr = [[NSMutableArray alloc] init];
    
    if([type isEqualToString:@"province"]){//省
        
        if (result) {
            self.area = ((ProvinceEntity*)result).province;
            
            self.provinceId = ((ProvinceEntity*)result).province_id;
            
            tmpArr = [self.dbOpreation getCityDataFromDB:self.provinceId];
            
            
            [self.areaDict setObject:NSStringFromInteger(self.provinceId) forKey:@"provinceId"];
            
            if ([tmpArr count]  == 0 ) {
      
                
                [self callBack];

                
            }else{
                
                self.pickerDatas = tmpArr;
                
                [self.pickerView readLoadDatas:self.pickerDatas];
                
                [self.pickerView show];
                
            }
            
        }
        
    }else if([type isEqualToString:@"city"]){//城市
        if (result) {
            
            self.area =  [self.area stringByAppendingString:((CityEntity*)result).city];
            
            self.cityId = ((CityEntity*)result).city_id;
            
            tmpArr = [self.dbOpreation getAreaDataFromDB:self.cityId];
            
            [self.areaDict setObject:NSStringFromInteger(self.cityId) forKey:@"cityId"];
            
            if([tmpArr count] == 0){
                
                
                
                [self callBack];


            }else{
                
                self.pickerDatas = tmpArr;
                
                [self.pickerView readLoadDatas:self.pickerDatas];
                
                [self.pickerView show];
                
            }
            
        }
        
    }else if([type isEqualToString:@"area"]){//区 街道
        if (result) {
            
            self.area = [self.area stringByAppendingString:((AreaEntity*)result).area];
            
            self.areaId = ((AreaEntity*)result).area_id;
            
            [self.areaDict setObject:NSStringFromInteger(self.areaId) forKey:@"areaId"];
            
             [self callBack];
            
        }else{
            
           
        }
        
    }
}

- (void)callBack
{
    
    if (_completeBlock) {
        
        _completeBlock(self.area,self.areaDict);
        
    }
}

-(void)initDataBase{
    
    NSString *dbPath = [[NSBundle mainBundle] pathForResource:@"smartmedical" ofType:@"db"];
    
    NSLog(@"path is %@",dbPath);
    
    NSFileManager *fm = [NSFileManager defaultManager];
    
    BOOL isExist = [fm fileExistsAtPath:DB_NAME];
    
    if (!isExist) {
        
        NSString *backupDbPath = [[NSBundle mainBundle]
                                  
                                  pathForResource:DB_NAME
                                  
                                  ofType:nil];
        
        [fm copyItemAtPath:backupDbPath toPath:dbPath error:nil];
        
    }else{
        
        NSLog(@"沙盒已经存在数据库文件");
        
    }
    
    FMDatabase * database = [ FMDatabase databaseWithPath: dbPath ];
    
    if ( ![database open ] )
    {
        NSLog(@"wusy init area db failed ");
        return;
        
    }else{
        
        NSLog(@"wusy init area db success ，begin to read data");
        self.dbOpreation = [[AreaDataBaseOpreation alloc] initWithDataBase:database];
        
        self.pickerDatas = [self.dbOpreation getProviceDataFromDB];
        
        [self.pickerView readLoadDatas:self.pickerDatas];
    }
    
    
}


-(NSArray *)loadData{
    
    self.pickerDatas = [[NSMutableArray alloc] init];
    
    return self.pickerDatas;
    
}
@end
