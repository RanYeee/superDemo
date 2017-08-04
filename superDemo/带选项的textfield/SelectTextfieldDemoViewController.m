//
//  SelectTextfieldDemoViewController.m
//  SuperDemo
//
//  Created by Rany on 2017/7/7.
//  Copyright © 2017年 Rany. All rights reserved.
//

#import "SelectTextfieldDemoViewController.h"
#import "RNSelectedTextfield.h"

@interface SelectTextfieldDemoViewController ()

@end

@implementation SelectTextfieldDemoViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    self.view.backgroundColor = [UIColor whiteColor];
    
    RNSelectedTextfield *selectTextfield = [[RNSelectedTextfield alloc]initWithFrame:CGRectMake(0, 0, self.view.bounds.size.width/2, 30)];
    selectTextfield.autoSaveCache = YES;
    selectTextfield.center = self.view.center;
    selectTextfield.cacheInputTextLimit = 5;
    [self.view addSubview:selectTextfield];
}


@end
