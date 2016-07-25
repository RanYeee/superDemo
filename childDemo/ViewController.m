//
//  ViewController.m
//  childDemo
//
//  Created by Rany on 16/5/6.
//  Copyright © 2016年 Rany. All rights reserved.
//

#import "ViewController.h"
#import "H5WebViewController.h"

@interface ViewController ()


@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];

    [self.navigationController pushViewController:[[H5WebViewController alloc]init] animated:YES];
}



@end
