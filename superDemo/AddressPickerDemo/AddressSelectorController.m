//
//  AddressSelectorController.m
//  SuperDemo
//
//  Created by Rany on 16/7/18.
//  Copyright © 2016年 Rany. All rights reserved.
//

#import "AddressSelectorController.h"
#import "KLAddressPickerView.h"

@interface AddressSelectorController ()

@property (nonatomic, strong) KLAddressPickerView *addPicker;

@end

@implementation AddressSelectorController

- (void)viewDidLoad {
    [super viewDidLoad];
   
    self.addPicker = [[KLAddressPickerView alloc]initAddressPickerWithSelectComplete:^(NSString *address,NSDictionary *addressIdDict) {
    
        NSLog(@"%@,\n,%@",address,addressIdDict);
    
    }];
    
    
}


- (IBAction)showPicker:(id)sender {
    
    [self.addPicker show];
    
}
- (IBAction)hidePicker:(id)sender {
    
    [self.addPicker hide];
}


@end
