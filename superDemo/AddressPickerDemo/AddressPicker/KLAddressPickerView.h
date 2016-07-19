//
//  KLAddressPickerView.h
//  ElectronicPrescribing
//
//  Created by Rany on 16/7/18.
//  Copyright © 2016年 Rany. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "ComPickerView.h"

typedef void(^AddressSelectCompleteBlock)(NSString *address,NSDictionary *addressIdDict);

@interface KLAddressPickerView : UIView <CompickerDataSource>



@property (nonatomic,strong) ComPickerView *pickerView;


- (instancetype)initAddressPickerWithSelectComplete:(AddressSelectCompleteBlock)complete;

- (void)show;

- (void)hide;

@end
