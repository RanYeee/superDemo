//
//  ComPickerView.h
//  ElectronicPrescribing
//
//  Created by Ducky on 16/5/3.
//  Copyright © 2016年 Rany. All rights reserved.
//

#import <UIKit/UIKit.h>
@class ComPickerView;

@protocol CompickerDataSource <NSObject>

-(NSMutableArray *)loadData;

@end

@interface ComPickerView : UIView <UIPickerViewDelegate,UIPickerViewDataSource>

typedef void(^onClickButtonAtcion)(NSString * type,NSObject * result);

-(instancetype)initWithClickDateButton:(onClickButtonAtcion)btnBlock withDelagateSource : (id <CompickerDataSource>) dataSource;

/** 显示 */
-(void)show;
/** 隐藏 */
-(void)hide;
/** 重新读取数据 **/
-(void)readLoadDatas:(NSMutableArray *) datas;


@property (strong,nonatomic) NSMutableArray *datas;

@property (weak, nonatomic) IBOutlet UIPickerView *mPickerView;

@property (weak,nonatomic) id <CompickerDataSource> dataSource;


@end
