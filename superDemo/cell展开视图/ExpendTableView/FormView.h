//
//  FormView.h
//  test
//
//  Created by Ducky on 15/12/14.
//  Copyright © 2015年 kinglian. All rights reserved.
//

#import <UIKit/UIKit.h>

@class FormView;

@protocol FormViewDelegate <NSObject>

-(void)loadMoreData:(FormView *)formView;

@end

@interface FormView : UIView

+ (instancetype)creatFormView;

@property (strong, nonatomic) IBOutlet UITableView *tableView;

@property (nonatomic ,strong) NSArray *listArray;

@property (nonatomic ,weak) id <FormViewDelegate> delegate;

@end
