//
//  DrawQRCodeController.m
//  SuperDemo
//
//  Created by Rany on 16/7/25.
//  Copyright © 2016年 Rany. All rights reserved.
//

#import "DrawQRCodeController.h"

@interface DrawQRCodeController ()
@property (strong, nonatomic) IBOutlet UITextField *textField;
@property (strong, nonatomic) IBOutlet UIImageView *imageView;

@end

@implementation DrawQRCodeController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    self.title = @"生成二维码";
    
    self.imageView.layer.borderWidth = 1.0f;
    
    self.imageView.layer.borderColor = [[UIColor colorWithRed:0.2 green:0.8 blue:0.8 alpha:1.0]CGColor];
    
   

}


- (IBAction)createQRCode:(id)sender {
    
    [self.imageView setImage:[Util createQRCodeFromString:_textField.text]];

}

@end
