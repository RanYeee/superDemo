//
//  KLTextViewController.m
//  SuperDemo
//
//  Created by Rany on 16/12/14.
//  Copyright © 2016年 Rany. All rights reserved.
//

#import "KLTextViewController.h"
#import "KLTextView.h"
#import <objc/runtime.h>
@interface KLTextViewController ()

@end

@implementation KLTextViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    self.automaticallyAdjustsScrollViewInsets = NO;
    
    KLTextView *textView = [[KLTextView alloc]initWithFrame:CGRectMake(10, 80, SCREEN_WIDTH-20, 200)];
    
    textView.backgroundColor = [UIColor groupTableViewBackgroundColor];
    
    textView.myPlaceholder = @"请从这里输入";
    
    [self.view addSubview:textView];
    
    [self runtime];

}


- (void)runtime
{
    unsigned int count = 0;
    Ivar *ivars = class_copyIvarList([UIActionSheet class], &count);
    for (int i = 0; i<count; i++) {
        // 取出成员变量
        //        Ivar ivar = *(ivars + i);
        Ivar ivar = ivars[i];
        // 打印成员变量名字
        NSLog(@"%s------%s", ivar_getName(ivar),ivar_getTypeEncoding(ivar));
    }
}


@end
