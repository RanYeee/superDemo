//
//  KLTextView.h
//  ElectronicPrescribing
//
//  Created by Rany on 16/12/14.
//  Copyright © 2016年 Rany. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface KLTextView : UITextView

@property(nonatomic,copy) IBInspectable NSString *myPlaceholder;  //文字

@property(nonatomic,strong) IBInspectable UIColor *myPlaceholderColor; //文字颜色

@end
