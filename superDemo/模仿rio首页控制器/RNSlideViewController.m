//
//  RNSlideViewController.m
//  SuperDemo
//
//  Created by Rany on 16/8/6.
//  Copyright © 2016年 Rany. All rights reserved.
//

#import "RNSlideViewController.h"

@interface RNSlideViewController ()<UITableViewDelegate,UITableViewDataSource,UIScrollViewDelegate>

{
    
    CGFloat _oldOffset;
    

}

@property (nonatomic,strong) UITableView *tableView;

@property (nonatomic,strong) UIView *topView;

@end

@implementation RNSlideViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    self.view.backgroundColor = [UIColor whiteColor];

    self.topView = [[UIView alloc]initWithFrame:CGRectMake(0, 0, SCREEN_WIDTH, 200)];
    
    self.topView.backgroundColor = [UIColor colorWithRed:0.3725 green:0.702 blue:0.2039 alpha:1.0];
    
    [self.view addSubview:self.topView];

    self.tableView = [[UITableView alloc]initWithFrame:CGRectMake(0, 150, SCREEN_WIDTH, SCREEN_HEIGHT-150) style:UITableViewStyleGrouped];
    
    self.tableView.delegate = self;
    
    self.tableView.dataSource = self;
    
    
    
    [self.view insertSubview:self.tableView belowSubview:self.topView];

}

-(void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    
    self.navigationController.navigationBar.hidden = YES;
}

-(void)viewWillDisappear:(BOOL)animated
{
    
    self.navigationController.navigationBar.hidden = NO;
}

#pragma mark - tabelView delegate & dataSource

-(NSInteger)numberOfSectionsInTableView:(UITableView *)tableView{
    
    return 1;
}

-(NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section{
    
    return 50;
}

-(UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath{
    
    static NSString *cellID = @"cellId";
    
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:cellID];
    
    if (!cell) {
        
        cell = [[UITableViewCell alloc]initWithStyle:UITableViewCellStyleValue1 reuseIdentifier:cellID];

    }
    
    return cell;
}

-(CGFloat)tableView:(UITableView *)tableView heightForHeaderInSection:(NSInteger)section
{
    
  
    return 30;
}


-(void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath{
    
}

-(UIView *)tableView:(UITableView *)tableView viewForHeaderInSection:(NSInteger)section
{
    
    if (section == 0) {
        
        
    }
    
    return nil;
    
}

//开始拖拽视图

- (void)scrollViewWillBeginDragging:(UIScrollView *)scrollView

{
    
    
    
}

-(void)scrollViewDidScroll:(UIScrollView *)scrollView
{
    
    CGFloat currentY = scrollView.contentOffset.y;
    
    CGRect topViewFrame = self.topView.frame;
    
    CGRect tableFrame = self.tableView.frame;
    
    
    NSLog(@"%f",currentY);
    

    if (currentY > _oldOffset && currentY > 0) {//如果当前位移大于缓存位移，说明scrollView向上滑动
        
        
        NSLog(@"up");
        
        topViewFrame.size.height -= 2;
        
//        tableFrame.origin.y -= 1;
        
        
    }else{
        
        if (currentY > 0) {
            
            NSLog(@"down");
            topViewFrame.size.height += 2;
            
//            tableFrame.origin.y += 1;
            
        }
        

    }
    
    if ( topViewFrame.size.height<100) {
        
        return;
    }
    
    [self.tableView setFrame:tableFrame];
    
    [self.topView setFrame:topViewFrame];
    
    _oldOffset = scrollView.contentOffset.y;//将当前位移变成缓存位移
    
}

-(void)scrollViewDidEndDecelerating:(UIScrollView *)scrollView
{
    

}

// 完成拖拽(滚动停止时调用此方法，手指离开屏幕前)

- (void)scrollViewDidEndDragging:(UIScrollView *)scrollView willDecelerate:(BOOL)decelerate

{
    
    
    
}



@end
